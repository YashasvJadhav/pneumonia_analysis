import os
from flask import Blueprint, jsonify, g, send_file
from routes.auth import token_required
from models import Upload, User
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

dashboard_bp = Blueprint("dashboard", __name__)


# =========================================================
# DASHBOARD API
# Summary statistics + latest 5 analyses
# =========================================================

@dashboard_bp.route(
    "/api/dashboard/<int:user_id>",
    methods=["GET"]
)
@token_required
def get_dashboard(user_id):
    if g.user_id != user_id:
        return jsonify({
            "success": False,
            "message": "Unauthorized access to dashboard"
        }), 403

    user_uploads = Upload.query.filter_by(
        user_id=user_id
    )

    total_analyses = user_uploads.count()

    normal_count = user_uploads.filter_by(
        prediction="NORMAL"
    ).count()

    pneumonia_count = user_uploads.filter_by(
        prediction="PNEUMONIA"
    ).count()

    recent_uploads = (
        Upload.query
        .filter_by(user_id=user_id)
        .order_by(Upload.uploaded_at.desc())
        .limit(5)
        .all()
    )

    recent_analyses = []

    for upload in recent_uploads:
        recent_analyses.append({
            "id": upload.id,
            "image_name": upload.image_name,
            "image_url": f"/api/uploads/{os.path.basename(upload.image_path)}" if upload.image_path else None,
            "heatmap_url": f"/api/uploads/{os.path.basename(upload.heatmap_path)}" if upload.heatmap_path else None,
            "prediction": upload.prediction,
            "confidence": upload.confidence,
            "uploaded_at": (
                upload.uploaded_at.isoformat()
                if upload.uploaded_at
                else None
            )
        })

    return jsonify({
        "success": True,
        "total_analyses": total_analyses,
        "normal_count": normal_count,
        "pneumonia_count": pneumonia_count,
        "recent_analyses": recent_analyses
    }), 200


# =========================================================
# ANALYSIS HISTORY API
# Complete history for one user
# =========================================================

@dashboard_bp.route(
    "/api/history/<int:user_id>",
    methods=["GET"]
)
@token_required
def get_analysis_history(user_id):
    if g.user_id != user_id:
        return jsonify({
            "success": False,
            "message": "Unauthorized access to history"
        }), 403

    uploads = (
        Upload.query
        .filter_by(user_id=user_id)
        .order_by(Upload.uploaded_at.desc())
        .all()
    )

    analyses = []

    for upload in uploads:
        analyses.append({
            "id": upload.id,
            "image_name": upload.image_name,
            "image_url": f"/api/uploads/{os.path.basename(upload.image_path)}" if upload.image_path else None,
            "heatmap_url": f"/api/uploads/{os.path.basename(upload.heatmap_path)}" if upload.heatmap_path else None,
            "prediction": upload.prediction,
            "confidence": upload.confidence,
            "uploaded_at": (
                upload.uploaded_at.isoformat()
                if upload.uploaded_at
                else None
            )
        })

    return jsonify({
        "success": True,
        "total_analyses": len(analyses),
        "analyses": analyses
    }), 200


# =========================================================
# SINGLE ANALYSIS RESULT API
# Securely returns one analysis belonging to one user
# =========================================================

@dashboard_bp.route(
    "/api/analysis/<int:analysis_id>/<int:user_id>",
    methods=["GET"]
)
@token_required
def get_analysis_result(analysis_id, user_id):
    if g.user_id != user_id:
        return jsonify({
            "success": False,
            "message": "Unauthorized access to analysis"
        }), 403

    upload = Upload.query.filter_by(
        id=analysis_id,
        user_id=user_id
    ).first()

    if not upload:
        return jsonify({
            "success": False,
            "message": "Analysis not found"
        }), 404

    return jsonify({
        "success": True,
        "analysis": {
            "id": upload.id,
            "image_name": upload.image_name,
            "image_url": f"/api/uploads/{os.path.basename(upload.image_path)}" if upload.image_path else None,
            "heatmap_url": f"/api/uploads/{os.path.basename(upload.heatmap_path)}" if upload.heatmap_path else None,
            "prediction": upload.prediction,
            "confidence": upload.confidence,
            "uploaded_at": (
                upload.uploaded_at.isoformat()
                if upload.uploaded_at
                else None
            )
        }
    }), 200


@dashboard_bp.route("/api/analysis/<int:analysis_id>/report", methods=["GET"])
@token_required
def download_analysis_report(analysis_id):
    upload = Upload.query.get(analysis_id)
    if not upload:
        return jsonify({"success": False, "message": "Analysis record not found"}), 404
        
    if upload.user_id != g.user_id:
        return jsonify({"success": False, "message": "Unauthorized access to report"}), 403
        
    user = User.query.get(upload.user_id)
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )
    
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0f2747'),
        spaceAfter=6
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#1565c0'),
        spaceBefore=12,
        spaceAfter=8,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#334155')
    )
    
    bold_body_style = ParagraphStyle(
        'BoldBodyText',
        parent=body_style,
        fontName='Helvetica-Bold'
    )
    
    disclaimer_style = ParagraphStyle(
        'DisclaimerText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=12,
        textColor=colors.HexColor('#7f1d1d')
    )

    story = []
    
    header_data = [
        [
            Paragraph("<b>PneumoAI</b>", ParagraphStyle('LogoStyle', parent=title_style, fontSize=24, textColor=colors.HexColor('#1976d2'))),
            Paragraph("<b>AI MEDICAL ANALYSIS REPORT</b><br/>Pneumonia Detection System", ParagraphStyle('HeaderText', parent=body_style, alignment=2, fontSize=9, textColor=colors.HexColor('#64748b')))
        ]
    ]
    header_table = Table(header_data, colWidths=[3.5*inch, 3.5*inch])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(header_table)
    
    divider = Table([['']], colWidths=[7*inch])
    divider.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,-1), 1.5, colors.HexColor('#1976d2')),
        ('BOTTOMPADDING', (0,0), (-1,-1), 15),
    ]))
    story.append(divider)
    
    report_date = upload.uploaded_at.strftime("%Y-%m-%d %H:%M:%S") if upload.uploaded_at else "N/A"
    
    meta_data = [
        [
            Paragraph("<b>PATIENT INFORMATION</b>", section_heading),
            Paragraph("<b>REPORT METADATA</b>", section_heading)
        ],
        [
            Paragraph(f"<b>Name:</b> {user.first_name} {user.last_name}<br/><b>Email:</b> {user.email}<br/><b>User ID:</b> #{user.id}", body_style),
            Paragraph(f"<b>Report ID:</b> #{100000 + upload.id}<br/><b>Analysis ID:</b> #{upload.id}<br/><b>Generated Date:</b> {report_date}", body_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[3.5*inch, 3.5*inch])
    meta_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 15),
    ]))
    story.append(meta_table)
    
    story.append(Paragraph("AI ANALYSIS RESULT", section_heading))
    
    is_pneumonia = upload.prediction == "PNEUMONIA"
    pred_color = '#dc2626' if is_pneumonia else '#07883f'
    interpretation = (
        "The AI model detected radiographic patterns that are consistent with pneumonia. Clinical confirmation is recommended."
        if is_pneumonia else
        "The AI model did not detect radiographic patterns commonly associated with pneumonia."
    )
    
    result_data = [
        [
            Paragraph("<b>AI Diagnosis:</b>", body_style),
            Paragraph(f"<font color='{pred_color}'><b>{upload.prediction}</b></font>", bold_body_style)
        ],
        [
            Paragraph("<b>Confidence Level:</b>", body_style),
            Paragraph(f"<b>{upload.confidence:.2f}%</b>", bold_body_style)
        ],
        [
            Paragraph("<b>AI Interpretation:</b>", body_style),
            Paragraph(interpretation, body_style)
        ]
    ]
    result_table = Table(result_data, colWidths=[1.8*inch, 5.2*inch])
    result_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(result_table)
    story.append(Spacer(1, 15))
    
    images_flowables = []
    
    orig_img_flowable = None
    if upload.image_path and os.path.exists(upload.image_path):
        try:
            orig_img_flowable = Image(upload.image_path, width=2.8*inch, height=2.8*inch)
        except Exception as img_err:
            orig_img_flowable = Paragraph(f"<i>Error loading original image scan</i>", body_style)
    else:
        orig_img_flowable = Paragraph("<i>No X-Ray Scan Uploaded</i>", body_style)
        
    heatmap_img_flowable = None
    if upload.heatmap_path and os.path.exists(upload.heatmap_path):
        try:
            heatmap_img_flowable = Image(upload.heatmap_path, width=2.8*inch, height=2.8*inch)
        except Exception as img_err:
            heatmap_img_flowable = Paragraph(f"<i>Error loading Grad-CAM overlay scan</i>", body_style)
    else:
        heatmap_img_flowable = Paragraph("<i>Grad-CAM visual overlay not available</i>", body_style)
        
    images_data = [
        [
            Paragraph("<b>Original Chest X-Ray Scan</b>", ParagraphStyle('ImgLabel', parent=body_style, alignment=1, fontName='Helvetica-Bold')),
            Paragraph("<b>Grad-CAM Visual Hotspots</b>", ParagraphStyle('ImgLabel', parent=body_style, alignment=1, fontName='Helvetica-Bold'))
        ],
        [
            orig_img_flowable,
            heatmap_img_flowable
        ],
        [
            Paragraph(f"<font size='7' color='#64748b'>File: {upload.image_name}</font>", ParagraphStyle('FileLbl', parent=body_style, alignment=1)),
            Paragraph("<font size='7' color='#64748b'>Highlighted regions indicate image areas contributing to prediction</font>", ParagraphStyle('HeatmapLbl', parent=body_style, alignment=1))
        ]
    ]
    
    images_table = Table(images_data, colWidths=[3.5*inch, 3.5*inch])
    images_table.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,0), 6),
        ('BOTTOMPADDING', (0,1), (-1,1), 4),
        ('BOTTOMPADDING', (0,2), (-1,-1), 10),
    ]))
    
    story.append(KeepTogether([images_table]))
    story.append(Spacer(1, 15))
    
    story.append(Paragraph("DIAGNOSTIC SYSTEM DETAILS", section_heading))
    model_data = [
        [
            Paragraph("<b>Model Architecture:</b> DenseNet121", body_style),
            Paragraph("<b>Framework:</b> TensorFlow / Keras", body_style),
            Paragraph("<b>Explainability:</b> Grad-CAM Enabled", body_style)
        ]
    ]
    model_table = Table(model_data, colWidths=[2.33*inch, 2.33*inch, 2.33*inch])
    model_table.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(model_table)
    story.append(Spacer(1, 15))
    
    disclaimer_box_data = [
        [
            Paragraph("<b>⚠️ MEDICAL AND EDUCATIONAL DISCLAIMER:</b><br/>"
                      "This report was generated automatically by an Artificial Intelligence model. It is intended for educational "
                      "and research purposes only and should not replace professional medical diagnosis. Always consult a qualified "
                      "radiologist or physician.", disclaimer_style)
        ]
    ]
    disclaimer_table = Table(disclaimer_box_data, colWidths=[7*inch])
    disclaimer_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#fef2f2')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#fee2e2')),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(disclaimer_table)
    
    doc.build(story)
    buffer.seek(0)
    
    return send_file(
        buffer,
        as_attachment=True,
        download_name=f"pneumoai_report_{upload.id}.pdf",
        mimetype="application/pdf"
    )
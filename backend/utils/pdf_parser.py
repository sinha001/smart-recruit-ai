from PyPDF2 import PdfReader

def parse_pdf(file_path: str) -> str:
    print(f"📄 Starting to parse PDF: {file_path}")
    
    try:
        reader = PdfReader(file_path)
        text = ""
        for i, page in enumerate(reader.pages):
            page_text = page.extract_text() or ""
            print(f"📃 Extracted text from page {i+1}: {len(page_text)} characters")
            text += page_text

        print(f"✅ Finished parsing PDF: {file_path} (Total length: {len(text)} characters)")
        return text
    except Exception as e:
        print(f"❌ Error while parsing PDF {file_path}: {e}")
        return ""

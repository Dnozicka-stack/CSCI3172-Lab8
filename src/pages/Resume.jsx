import 'bootstrap/dist/css/bootstrap.min.css'

function Resume() {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h1 className="text-center mb-4">Resume</h1>
          
          <div className="text-center mb-4">
            <a 
              href="/files/Dino-Nozicka-Resume.pdf" 
              download 
              className="btn btn-primary"
            >
              <i className="bi bi-download me-2"></i>
              Download PDF
            </a>
          </div>

          <div className="ratio ratio-16x9">
            <iframe
              src="/files/Dino-Nozicka-Resume.pdf"
              title="Resume"
              width="100%"
              height="800px"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume 
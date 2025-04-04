
const About = () => {
  return (
    <div className=" mt-5 d-flex flex-column">
<header style={{backgroundImage:`url("https://www.teknikakademin.se/wp-content/uploads/2025/01/1200x675_vrblognew_email-marketing-tips-for-educational-institutions.jpg.webp")`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed', 
                backgroundPosition: 'center center', 
                height: '100vh', 
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'flex-start',
      }} className="bg-primary text-white text-center">
    <div className="container-fluid bg-primary opacity-75 py-5 ">
        <h1>Om Vår E-Learning Plattform</h1>
        <p className="lead">Från nybörjare till expert – vi erbjuder teknikutbildning för alla, med kvalitet och kompetens i fokus.</p>
    </div>
</header>
<section className="py-5">
    <h2 className="text-center mb-3">Vår Mission</h2>
    <p className="text-center">Vi strävar efter att göra utbildning tillgänglig, engagerande och effektiv för elever och lärare över hela världen.</p>
</section>

<section style={{backgroundImage:`url("https://www.teknikakademin.se/wp-content/uploads/2024/12/circle-part-green.svg")`,
                      backgroundPosition: 'left center', 
                      backgroundRepeat: 'no-repeat',
                      margin: '0',
      }} className="container-fluid py-5">
      <h2 className="text-center mb-5">Vad Vi Gör</h2>
      <div className="row justify-content-center text-left">
          <div className="col-md-4">
              <h4>Bemanning och rekrytering</h4>
              <p>Vi matchar tekniska experter med företag inom industri, energi, IT och andra teknikområden. Genom en noggrann rekryteringsprocess säkerställer vi att våra kunder får de bästa talangerna.</p>
          </div>
          <div className="col-md-4 ">
              <h4>Utbildning och kompetensutveckling</h4>
              <p>Vi erbjuder anpassade utbildningar och kurser för att stärka yrkeskompetens och säkerställa att tekniker och ingenjörer håller sig uppdaterade med den senaste utvecklingen.</p>
          </div>
          <div className="col-md-4">
              <h4>Konsulttjänster</h4>
              <p>Vi hjälper företag att optimera sin personalstyrka genom flexibla och effektiva lösningar som möter branschens behov.</p>
          </div>
    </div>
</section>

<section className="bg-light py-5">
    <div className="container-fluid">
        <h2 className="text-center mb-3">Träffa Vår Utvecklingsteam</h2>
        <div className="row text-center">
            <div className="col-md-4">
                <h5>Paul Yashouh</h5>
                <p>Contributor 1</p>
            </div>
            <div className="col-md-4">
                <h5>Muhammed Khavari</h5>
                <p>Contributor 2</p>
            </div>
            <div className="col-md-4">
                <h5>Ammar Ove</h5>
                <p>Contributor 3</p>
            </div>
        </div>
    </div>
</section>

<section className="container-fluid py-5">
    <h2 className="text-center mb-3">Vad Våra Användare Säger</h2>
    <div className="row text-center">
        <div className="col-md-6">
            <blockquote className="blockquote">
                <p>"This platform has transformed the way I learn! The courses are amazing!"</p>
                <footer className="blockquote-footer">Student A</footer>
            </blockquote>
        </div>
        <div className="col-md-6">
            <blockquote className="blockquote">
                <p>"Teaching online has never been easier. The tools provided are fantastic!"</p>
                <footer className="blockquote-footer">Teacher B</footer>
            </blockquote>
        </div>
    </div>
</section>

<section className="bg-light py-5">
    <div className="container-fluid text-center">
        <h2>Låt Oss Växa Tillsammans!</h2>
        <p>Oavsett om du är företag som söker rätt kompetens eller en tekniker som vill ta nästa steg i karriären, finns vi här för att hjälpa dig. Kontakta oss idag för att ta reda på hur vi kan stötta dig på resan mot framgång!</p>
    </div>
</section>
<footer className="bg-dark text-white text-center py-3">
    <p>&copy; 2025 E-Learning Platform. All rights reserved.</p>
</footer>
</div>
  )
}

export default About

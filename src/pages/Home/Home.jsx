import "./Home.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

function Home() {
  return (
    
    <div className="home-container">
      <div>
        <img src="/public/Profile.jpg" alt="" className="home-img" />
      </div>
      <div className="home-content">
        <div className="home-text">
          <h2>Peerapat Pimta</h2>
          <p style={{ textAlign: "left", width: "300px" }}>
            I'm guy. I want to know how computers work. When I solved various code problems, I felt happy and fun, which made me want to learn more and want to delve deeper into computer science and programming. And I want to be a programmer who creates things and develops better software systems, which is why I want to enter a field related to computers.
          </p>
          <a href="https://github.com/peerapatgain" className="btn btn-outline-dark bi bi-github"></a>
        </div>
      </div>
    </div>
  );
}

export default Home;

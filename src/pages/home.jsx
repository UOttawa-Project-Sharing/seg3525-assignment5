import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ktm from '../assets/ktm_bike.png';
import honda from '../assets/honda_bike.png';
import RiderCard from '../components/riderCards';
import motogp from '../assets/motogp.png';
import ducati from '../assets/ducati_bike.png';
import RiderStatCard from "../components/riderCards";
import {getMotoGPTop3Riders} from "../data/getterAPI.js";
import {useEffect, useState} from "react";


function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    getMotoGPTop3Riders()
        .then((result) => {
          setData(result);
          console.log(result);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
  }, []);

  return (
    <Container fluid>
      {/* Section 1 */}
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Row className="flex-grow-1 w-100 align-items-center" style={{ overflow: 'hidden' }}>
          <Col xs={4} className="d-flex justify-content-start">
            <img src={ktm} alt="KTM Bike" style={{ height: '50vh', width: 'auto', position: 'relative', left: '-150px' }} />
          </Col>
          <Col xs={4} className="text-center">
            <h2>Welcome to GP-Statz</h2>
            <p>All the stats you need to be a pro moto gp fan.</p>
            <p>Explore rider stats, team performance, and race history. Stay updated and become a MotoGP expert!</p>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <img src={honda} alt="Honda Bike" style={{ height: '50vh', width: 'auto', position: 'relative', right: '-150px', transform: 'scaleX(-1)' }} />
          </Col>
        </Row>
      </section>
      {/* Section 2 */}
      <section style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
        <Row className="w-100 justify-content-center">
          {loading ? <>loading...</> : data.map(riderObj => (
            <Col xs="auto" key={riderObj.rider.uuid}>
              <RiderStatCard
                number={riderObj.rider.number}
                name={riderObj.rider.full_name}
                constructor={riderObj.team.name}
                points={riderObj.points}
                podiums={riderObj.podiums}
                riderImage={riderObj.riderInfo.career[0].pictures.profile.main}
                bikeImage={riderObj.riderInfo.career[0].team.picture}
                flagImage={riderObj.riderInfo.country.flag}
              />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}

export default HomePage;

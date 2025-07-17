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
      <section style={{ marginTop: 20, minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Row className="align-items-center w-100 justify-content-center">
          <h2>Welcome to GP-Statz</h2>
          <p>All the stats you need to be a pro moto gp fan.</p>
          <p>Explore rider stats, team performance, and race history. Stay updated and become a MotoGP expert!</p>
        </Row>
        <Row className="align-items-center w-100 justify-content-center">
          <Col xs={6} className="d-flex justify-content-center">
            <img src={ktm} alt="KTM Bike" style={{ height: 'auto', width: '40vw' }} />
          </Col>
          <Col xs={6} className="d-flex justify-content-center">
            <img src={honda} alt="Honda Bike" style={{ height: 'auto', width: '40vw', transform: 'scaleX(-1)' }} />
          </Col>
        </Row>
      </section>
      {/* Section 2 */}
      <section className={"bg-light"} style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <h2 className="text-center mb-4">Current Best Riders</h2>
        <Row className="w-100 justify-content-center">
            {loading ? <>loading...</> : (error != null) ? <><p>{error}</p></> : data.map(riderObj => (
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
                position={riderObj.position}
              />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}

export default HomePage;

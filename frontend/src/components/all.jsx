import { useState } from 'react'
import emailjs from 'emailjs-com'
import { Row, Col, Carousel } from "react-bootstrap"
const initialState = {
  name: '',
  email: '',
  message: '',
}

export const All = (props) => {
    const [{ name, email, message }, setState] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }
  const clearState = () => setState({ ...initialState })

  const handleSubmit = (e) => {
    e.preventDefault()
    emailjs
      .sendForm(
        'service_gp7h96n', 'template_fl6azx9', e.target, 'user_EYBAcb2SG5sb114dYWY98'
      )
      .then(
        (result) => {
          console.log(result.text)
          clearState()
        },
        (error) => {
          console.log(error.text)
        }
      )
      e.target.reset()
  }
  const imgArray = ["img/portfolio/01-small.jpg", "img/portfolio/02-small.jpg", "img/portfolio/03-small.jpg","img/portfolio/04-small.jpg", "img/portfolio/05-small.jpg", "img/portfolio/06-small.jpg", "img/portfolio/07-small.jpg", "img/portfolio/08-small.jpg", "img/portfolio/09-small.jpg"]

    return (
        <div  style={{margin: "0.0rem"}}>
      <header id='header'>
        <div className='intro'>
          <div className='overlay'>
            <div className='container'>
              <Row>
                <Col md={12} className='intro-text'>
                  <h1>
                    {props.data.Header ? props.data.Header.title : 'Loading'}
                    <span></span>
                  </h1>
                  <p>{props.data.Header ? props.data.Header.paragraph : 'Loading'}</p>
                  <a
                    href='#features'
                    className='btn btn-custom btn-lg page-scroll'
                  >
                    Learn More
                  </a>{' '}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </header>
      <div id='features' className='text-center'>
      <div className='container'>
        {/* <div className='col-md-10 col-md-offset-1 section-title'> */}
          <Row className="section-title">
            <Col md={12}>
            <h2>Features</h2>
            </Col>
          </Row>
          
        {/* </div> */}
        <Row className='row'>
          {props.data.Features
            ? props.data.Features.map((d, i) => (
                <Col md={3} key={`${d.title}-${i}`}>
                  {' '}
                  <i className={d.icon} style={{fontSize: "3rem"}}></i>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </Col>
              ))
            : 'Loading...'}
        </Row>
      </div>
    </div>
    <div id='about'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-6'>
            {' '}
            <img src='img/about.jpg' className='img-responsive' alt='' />{' '}
          </div>
          <div className='col-xs-12 col-md-6'>
            <div className='about-text'>
              <h2>About Us</h2>
              <p>{props.data.About ? props.data.About.paragraph : 'loading...'}</p>
              <h3>Why Choose Us?</h3>
              <div className='list-style'>
                <div className='col-lg-6 col-sm-6 col-xs-12'>
                  <ul>
                    {props.data.About
                      ? props.data.About.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : 'loading'}
                  </ul>
                </div>
                <div className='col-lg-6 col-sm-6 col-xs-12'>
                  <ul>
                    {props.data.About
                      ? props.data.About.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : 'loading'}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id='services' className='text-center' style={{background: '#78c2ad'}}>
      <div className='container'>
        <div className='section-title'>
          <h2>Our Services</h2>
        </div>
        <div className='row'>
          {props.data.Services
            ? props.data.Services.map((d, i) => (
                <div key={`${d.name}-${i}`} className='col-md-4'>
                  {' '}
                  <i className={d.icon} style={{fontSize: "3rem"}}></i>
                  <div className='service-desc'>
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
      </div>
    </div>
    <div id='portfolio' className='text-center'>
      <div className='container'>
          <Row className="section-title">
            <Col md={12}>
            <h2>Gallery</h2>
            </Col>
          </Row>
          <Row>
          <Col md={2}></Col>
            <Col md={8}>
          <Carousel>
            {imgArray.map((i, idx) => (
              // <Col md={1}>
              <Carousel.Item>
              <img
                className="d-block w-100"
                src={i}
                alt="First slide"
              />
              {/* <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption> */}
            </Carousel.Item>
            ))}
          </Carousel> </Col><Col md={2}></Col></Row>
      </div>
    </div>
    <div id='testimonials'>
      <div className='container'>
        <div className='section-title text-center'>
          <h2>Our Story</h2>
        </div>
        <Row className='row'>
          {props.data.Testimonials
            ? props.data.Testimonials.map((d, i) => (
                <Col md={12} key={`${d.name}-${i}`} className='col-md-4'>
                  <div className='testimonial'>
                    <div className='testimonial-image'>
                      {' '}
                      <img src={d.img} alt='' />{' '}
                    </div>
                    <div className='testimonial-content'>
                      <p>"{d.text}"</p>
                      <div className='testimonial-meta'> - {d.name} </div>
                    </div>
                  </div>
                </Col>
              ))
            : 'loading'}
        </Row>
      </div>
    </div>
    <div id='team' className='text-center'>
      <div className='container'>
      <Row className="section-title">
            <Col md={12}>
            <h2>Meet the Team</h2>
            </Col>
          </Row>
        <Row id='row'>
          {props.data.Team
            ? props.data.Team.map((d, i) => (
                <Col md={3} key={`${d.name}-${i}`} className='team'>
                  <div className='thumbnail'>
                    {' '}
                    <img src={d.img} alt='...' className='team-img' />
                    <div className='caption'>
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                    </div>
                  </div>
                </Col>
              ))
            : 'loading'}
        </Row>
      </div>
    </div>
    <div>
      <div id='contact' style={{background: '#78c2ad'}}>
        <div className='container'>
            <Row>
              <Col md={5} className='section-title'>
              <div>
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
                </div>
              </Col>
              <Col md={7} className='section-title'>
              <h2>Contact Info</h2>
              <p>
                <span>
                  <i className='fa fa-map-marker'></i> &nbsp;
                </span>
                {props.data.Contact ? props.data.Contact.address : 'loading'}
              </p>
              <p>
                <span>
                  <i className='fa fa-phone'></i>
                </span>{' '}
                {props.data.Contact ? props.data.Contact.phone : 'loading'}
              </p>
              <p >
                <span>
                  <i className='fas fa-envelope'></i>
                </span>{' '}
                <a href="mailto:fandtnature@gmail.com" style={{color: '#fff'}}>{props.data.Contact ? props.data.Contact.email : 'loading'}</a>
              </p>
              </Col>
            </Row>
            <Row>
              <Col md={3}></Col>
              <Col md={6}>
              <form name='sentMessage' validate onSubmit={handleSubmit}>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        placeholder='Name'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>

                      <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        placeholder='Email'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    
                <div className='form-group'>
                  <textarea
                    name='message'
                    id='message'
                    className='form-control'
                    rows='4'
                    placeholder='Message'
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className='help-block text-danger'></p>
                </div>
                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg'>
                  Send Message
                </button>
              </form>
              </Col>
              <Col md={3}></Col>
            </Row>

          <Row>
          <Col md={3}></Col>
          <Col md={6}>
              <div className='social'>
                <ul>
                  <li>
                    <a href={props.data.Contact ? props.data.Contact.instagram : '/'}>
                      <i className='fab fa-instagram' style={{fontSize: "2rem", color: '#fff'}}></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data.Contact ? props.data.Contact.linkedin : '/'}>
                      <i className='fab fa-linkedin' style={{fontSize: "2rem", color: '#fff'}}></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data.Contact ? props.data.Contact.twitter : '/'}>
                      <i className='fab fa-twitter' style={{fontSize: "2rem", color: '#fff'}}></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data.Contact ? props.data.Contact.facebook : '/'}>
                      <i className='fab fa-facebook' style={{fontSize: "2rem", color: '#fff'}}></i>
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={3}></Col>
          </Row>
        </div>
      </div>
      
    </div>
      </div>
    )
  }
  
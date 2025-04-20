import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faCalendarCheck, faUser, faClock, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import './Trainers.css';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [selectedTrainerReviews, setSelectedTrainerReviews] = useState([]);

  // Simüle edilmiş veri
  useEffect(() => {
    // Gerçek uygulamada API'den verileri çekersiniz
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simüle edilmiş antrenör verileri
        const trainerData = [
          {
            id: 1,
            name: 'Ahmet Yılmaz',
            title: 'Baş Fitness Eğitmeni',
            rating: 4.9,
            reviewCount: 48,
            image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            specialties: ['weightlifting', 'personal'],
            experience: '8 yıl',
            description: 'NASM sertifikalı, özellikle kuvvet antrenmanlarında uzmanlaşmış bir eğitmen. Yüzlerce öğrenciye kilo verme ve kas kazanma konusunda yardımcı oldu.',
            certifications: ['NASM CPT', 'TRX Level 2', 'Functional Training', 'Kinesiology Diploma'],
            availabilityHours: '09:00 - 21:00',
            availabilityDays: 'Pazartesi, Çarşamba, Cuma, Cumartesi',
            sessions: '$50/seans',
            email: 'ahmet.yilmaz@matfit.com',
            phone: '+90 555 123 45 67',
            socialMedia: {
              instagram: 'ahmetyilmaz_fitness',
              facebook: 'ahmetyilmazfitness',
              twitter: 'ahmetyilmaz'
            },
            reviews: [
              {
                id: 1,
                name: "Mehmet Aydın",
                rating: 5,
                date: "15.03.2023",
                comment: "Ahmet Bey ile 6 ay boyunca çalıştım ve 15 kilo verdim. Profesyonel yaklaşımı ve motivasyonu sayesinde hedeflerime ulaştım. Kesinlikle tavsiye ederim!"
              },
              {
                id: 2,
                name: "Ayşe Kaya",
                rating: 5,
                date: "02.05.2023",
                comment: "Uzun süre spor yapmamıştım ve yeniden başlamak için Ahmet Hoca ile çalışmaya başladım. Beni çok iyi yönlendirdi ve kademeli olarak ilerlememi sağladı. Çok memnun kaldım."
              },
              {
                id: 3,
                name: "Burak Özdemir",
                rating: 4,
                date: "17.06.2023",
                comment: "Kuvvet antrenmanları konusunda gerçekten bilgili bir eğitmen. Bana doğru tekniği öğretti ve performansımı artırmama yardımcı oldu."
              },
              {
                id: 4,
                name: "Zeynep Koç",
                rating: 5,
                date: "08.08.2023",
                comment: "Kas kazanma programı için Ahmet Hoca ile çalıştım. Beslenme programı ve antrenman planı sayesinde 3 ayda ciddi bir değişim yaşadım."
              }
            ]
          },
          {
            id: 2,
            name: 'Ayşe Demir',
            title: 'Yoga & Pilates Eğitmeni',
            rating: 5.0,
            reviewCount: 59,
            image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            specialties: ['yoga', 'pilates', 'personal'],
            experience: '6 yıl',
            description: 'RYT-200 sertifikalı yoga eğitmeni. Hem gruplara hem de bireylere özel yoga dersleri vermektedir. Ayrıca pilates konusunda da uzmandır.',
            certifications: ['RYT-200', 'Pilates Mat Instructor', 'Pre-natal Yoga', 'Yoga Therapy'],
            availabilityHours: '07:00 - 19:00',
            availabilityDays: 'Salı, Perşembe, Cumartesi, Pazar',
            sessions: '$45/seans',
            email: 'ayse.demir@matfit.com',
            phone: '+90 555 987 65 43',
            socialMedia: {
              instagram: 'aysedemir_yoga',
              facebook: 'aysedemir.yoga',
              twitter: 'aysedemir'
            },
            reviews: [
              {
                id: 1,
                name: "Elif Yıldız",
                rating: 5,
                date: "23.01.2023",
                comment: "Ayşe Hanım'ın yoga dersleri hayatımı değiştirdi. Hem fiziksel hem de zihinsel olarak kendimi daha iyi hissediyorum. Dersleri çok rahatlatıcı ve eğlenceli."
              },
              {
                id: 2,
                name: "Murat Şahin",
                rating: 5,
                date: "14.04.2023",
                comment: "İş stresinden dolayı yoga derslerine başladım. Ayşe Hanım'ın dersleri sayesinde daha sakin ve odaklanmış hissediyorum. Kesinlikle tavsiye ederim!"
              },
              {
                id: 3,
                name: "Ceren Aksoy",
                rating: 5,
                date: "30.05.2023",
                comment: "Hamilelik dönemimde özel derslere katıldım. Ayşe Hanım çok bilgili ve anlayışlı bir eğitmen. Doğum sonrası toparlanmam da çok hızlı oldu."
              },
              {
                id: 4,
                name: "Ali Yılmaz",
                rating: 5,
                date: "11.07.2023",
                comment: "Sırt ağrılarım için doktorum pilates önermişti. Ayşe Hanım ile çalıştıktan sonra ağrılarım büyük ölçüde azaldı. Harika bir eğitmen!"
              },
              {
                id: 5,
                name: "Deniz Kaya",
                rating: 5,
                date: "19.09.2023",
                comment: "Hem yoga hem pilates derslerine katılıyorum. Ayşe Hanım her ikisinde de çok başarılı. Dersleri sıkıcı olmuyor ve her seviyeye uygun egzersizler yapıyoruz."
              }
            ]
          },
          {
            id: 3,
            name: 'Mehmet Can',
            title: 'Crossfit & HIIT Eğitmeni',
            rating: 4.7,
            reviewCount: 32,
            image: 'https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            specialties: ['crossfit', 'hiit', 'group'],
            experience: '5 yıl',
            description: 'CrossFit Level 2 sertifikalı antrenör. Yüksek yoğunluklu interval antrenmanlarında (HIIT) uzmanlaşmıştır. Grup dersleri ve fonksiyonel antrenmanlar konusunda deneyimlidir.',
            certifications: ['CrossFit Level 2', 'HIIT Specialist', 'Kettlebell Coach', 'First Aid'],
            availabilityHours: '10:00 - 22:00',
            availabilityDays: 'Pazartesi, Salı, Perşembe, Cuma',
            sessions: '$55/seans',
            email: 'mehmet.can@matfit.com',
            phone: '+90 555 234 56 78',
            socialMedia: {
              instagram: 'mehmetcan_fitness',
              facebook: 'mehmetcan.fitness',
              twitter: 'mehmetcanfit'
            },
            reviews: [
              {
                id: 1,
                name: "Serkan Öztürk",
                rating: 5,
                date: "10.02.2023",
                comment: "Mehmet Hoca'nın CrossFit derslerinde kendimi aştım. Her antrenmanda limitlerimi zorluyorum ve sonuçlar inanılmaz!"
              },
              {
                id: 2,
                name: "Gizem Çelik",
                rating: 4,
                date: "05.03.2023",
                comment: "HIIT derslerine katılıyorum ve çok memnunum. Mehmet Hoca dersleri çok enerjik ve motive edici yapıyor."
              },
              {
                id: 3,
                name: "Okan Demir",
                rating: 5,
                date: "22.06.2023",
                comment: "Grup derslerinde bile kişisel ilgi göstermeyi başarıyor. Teknik konusunda çok titiz, bu sayede sakatlanma riskiniz de azalıyor."
              }
            ]
          },
          {
            id: 4,
            name: 'Zeynep Yıldız',
            title: 'Beslenme Danışmanı',
            rating: 4.9,
            reviewCount: 45,
            image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            specialties: ['nutrition', 'personal'],
            experience: '7 yıl',
            description: 'Diyetetik uzmanı ve fitness beslenmesi konusunda uzmanlaşmış bir beslenme danışmanı. Kilo yönetimi, kas kazanımı ve performans artışı için kişiselleştirilmiş beslenme planları hazırlar.',
            certifications: ['MS in Dietetics', 'Sports Nutrition Specialist', 'ACE Nutrition Specialist'],
            availabilityHours: '09:00 - 18:00',
            availabilityDays: 'Pazartesi, Çarşamba, Cuma',
            sessions: '$60/seans',
            email: 'zeynep.yildiz@matfit.com',
            phone: '+90 555 345 67 89',
            socialMedia: {
              instagram: 'zeynepyildiz_nutrition',
              facebook: 'zeynepyildiz.nutrition',
              twitter: 'zeynepyildiz'
            }
          },
          {
            id: 5,
            name: 'Emre Kaya',
            title: 'Kişisel Antrenör',
            rating: 4.8,
            reviewCount: 37,
            image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            specialties: ['personal', 'weightlifting', 'functional'],
            experience: '9 yıl',
            description: 'ACE ve ACSM sertifikalı kişisel antrenör. Fonksiyonel egzersiz ve kuvvet antrenmanları konusunda uzmanlaşmıştır. Eski bir vücut geliştirmeci olarak, kişisel deneyimlerini müşterilerine aktarır.',
            certifications: ['ACE CPT', 'ACSM CPT', 'Functional Movement Specialist', 'Corrective Exercise Specialist'],
            availabilityHours: '08:00 - 20:00',
            availabilityDays: 'Salı, Perşembe, Cumartesi, Pazar',
            sessions: '$65/seans',
            email: 'emre.kaya@matfit.com',
            phone: '+90 555 456 78 90',
            socialMedia: {
              instagram: 'emrekaya_fitness',
              facebook: 'emrekaya.fitness',
              twitter: 'emrekayafit'
            }
          },
          {
            id: 6,
            name: 'Selin Koç',
            title: 'Dans & Cardio Eğitmeni',
            rating: 4.8,
            reviewCount: 41,
            image: 'https://images.unsplash.com/photo-1593164842264-854604db2260?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            specialties: ['zumba', 'cardio', 'group'],
            experience: '4 yıl',
            description: 'Zumba ve çeşitli dans fitness programları konusunda sertifikalı eğitmen. Eğlenceli grup dersleri ve kardio antrenmanları ile tanınır.',
            certifications: ['Zumba Instructor', 'Aerobics Instructor', 'Dance Fitness Specialist'],
            availabilityHours: '14:00 - 22:00',
            availabilityDays: 'Pazartesi, Çarşamba, Cuma, Cumartesi',
            sessions: '$40/seans',
            email: 'selin.koc@matfit.com',
            phone: '+90 555 567 89 01',
            socialMedia: {
              instagram: 'selinkoc_dance',
              facebook: 'selinkoc.dance',
              twitter: 'selinkoc'
            }
          }
        ];
        
        // Uzmanlık alanları
        const specialtyData = [
          { id: 'all', name: 'Tüm Eğitmenler' },
          { id: 'personal', name: 'Kişisel Antrenman' },
          { id: 'yoga', name: 'Yoga' },
          { id: 'pilates', name: 'Pilates' },
          { id: 'weightlifting', name: 'Ağırlık Antrenmanı' },
          { id: 'crossfit', name: 'CrossFit' },
          { id: 'hiit', name: 'HIIT' },
          { id: 'nutrition', name: 'Beslenme' },
          { id: 'zumba', name: 'Zumba/Dans' },
          { id: 'functional', name: 'Fonksiyonel Antrenman' },
          { id: 'group', name: 'Grup Dersleri' },
          { id: 'cardio', name: 'Kardio' }
        ];
        
        setTrainers(trainerData);
        setSpecialties(specialtyData);
        setLoading(false);
      } catch (error) {
        console.error('Eğitmen verileri yüklenirken hata oluştu:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Eğitmenleri filtrele
  const filteredTrainers = trainers.filter(trainer => {
    if (selectedSpecialty === 'all') {
      return true;
    }
    return trainer.specialties.includes(selectedSpecialty);
  });

  // Randevu modalını aç
  const openBookingModal = (trainer) => {
    setSelectedTrainer(trainer);
    setShowModal(true);
  };

  // Değerlendirme modalını aç
  const openReviewsModal = (trainer) => {
    setSelectedTrainer(trainer);
    setSelectedTrainerReviews(trainer.reviews || []);
    setShowReviewsModal(true);
  };

  // Randevu gönder
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Gerçek uygulamada bu verileri API'ye gönderirsiniz
    console.log('Randevu bilgileri:', {
      trainerId: selectedTrainer.id,
      trainerName: selectedTrainer.name,
      date: bookingDate,
      time: bookingTime,
      message: bookingMessage
    });
    
    // Form alanlarını temizle
    setBookingDate('');
    setBookingTime('');
    setBookingMessage('');
    setShowModal(false);
    
    // Başarılı mesajı göster
    alert('Randevu talebiniz başarıyla gönderildi! Eğitmen sizinle iletişime geçecektir.');
  };

  // Yıldız değerlendirmesi göster
  const renderStarRating = (rating, size = "1x") => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon 
          key={i} 
          icon={i <= rating ? fasStar : farStar} 
          className={`${i <= rating ? 'text-warning' : 'text-muted'} me-1`} 
          size={size}
        />
      );
    }
    return stars;
  };

  return (
    <div className="trainers-page">
      {/* Hero Section */}
      <section className="trainers-hero">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto text-center">
              <h1>UZMAN EĞİTMENLERİMİZ</h1>
              <p className="lead">
                Fitness hedeflerinize ulaşmanıza yardımcı olacak profesyonel ve sertifikalı eğitmenlerimizle tanışın. 
                İster kişisel antrenman, ister grup dersleri veya beslenme danışmanlığı olsun, size uygun bir eğitmen bulabilirsiniz.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Uzmanlık Filtresi */}
      <section className="specialty-filter">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2>Uzmanlık Alanına Göre Eğitmen Bul</h2>
              <div className="specialty-buttons my-4">
                {specialties.map(specialty => (
                  <Button 
                    key={specialty.id}
                    variant={selectedSpecialty === specialty.id ? "primary" : "outline-primary"}
                    className="m-1"
                    onClick={() => setSelectedSpecialty(specialty.id)}
                  >
                    {specialty.name}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Eğitmen Listesi */}
      <section className="trainers-list">
        <Container>
          <Row>
            {loading ? (
              <Col xs={12} className="text-center py-5">
                <p>Eğitmenler yükleniyor...</p>
              </Col>
            ) : filteredTrainers.length === 0 ? (
              <Col xs={12} className="text-center py-5">
                <p>Seçilen uzmanlık alanında eğitmen bulunamadı.</p>
              </Col>
            ) : (
              filteredTrainers.map((trainer) => (
                <Col md={6} lg={4} key={trainer.id} className="mb-4">
                  <Card className="trainer-card h-100">
                    <div className="trainer-image-container">
                      <Card.Img 
                        variant="top" 
                        src={trainer.image} 
                        alt={trainer.name}
                        className="trainer-image" 
                      />
                      <div className="trainer-overlay">
                        <div className="trainer-social">
                          <a href={`https://instagram.com/${trainer.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                          </a>
                          <a href={`https://facebook.com/${trainer.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                          </a>
                          <a href={`https://twitter.com/${trainer.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <Card.Body>
                      <div 
                        className="trainer-rating mb-2" 
                        onClick={() => openReviewsModal(trainer)}
                        style={{ cursor: 'pointer' }}
                      >
                        <FontAwesomeIcon icon={fasStar} className="rating-star text-warning" />
                        <span>{trainer.rating.toFixed(1)}</span>
                        <small className="text-muted ms-1">
                          ({trainer.reviewCount} değerlendirme)
                        </small>
                        <small className="view-reviews ms-2">İncele</small>
                      </div>
                      <Card.Title className="trainer-name">{trainer.name}</Card.Title>
                      <p className="trainer-title">{trainer.title}</p>
                      <p className="trainer-experience">
                        <strong>Deneyim:</strong> {trainer.experience}
                      </p>
                      <div className="trainer-specialties mb-3">
                        {trainer.specialties.map(specialty => {
                          const specialtyObj = specialties.find(s => s.id === specialty);
                          return specialtyObj ? (
                            <span key={specialty} className="specialty-badge">
                              {specialtyObj.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                      <p className="trainer-description">{trainer.description}</p>
                      <div className="trainer-certifications mb-3">
                        <h6>Sertifikalar:</h6>
                        <ul>
                          {trainer.certifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="trainer-availability mb-3">
                        <p><strong>Müsait Günler:</strong> {trainer.availabilityDays}</p>
                        <p><strong>Müsait Saatler:</strong> {trainer.availabilityHours}</p>
                        <p><strong>Seans Ücreti:</strong> {trainer.sessions}</p>
                      </div>
                      <div className="trainer-contact mb-3">
                        <div>
                          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                          <a href={`mailto:${trainer.email}`}>{trainer.email}</a>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faPhone} className="me-2" />
                          <a href={`tel:${trainer.phone}`}>{trainer.phone}</a>
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Footer className="text-center bg-white border-0">
                      <Button 
                        variant="primary" 
                        className="book-trainer-btn"
                        onClick={() => openBookingModal(trainer)}
                      >
                        <FontAwesomeIcon icon={faCalendarCheck} className="me-2" />
                        Randevu Al
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>

      {/* Randevu Modal */}
      {selectedTrainer && (
        <div className={`booking-modal ${showModal ? 'show' : ''}`}>
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <h4>Eğitmen ile Randevu Al: {selectedTrainer.name}</h4>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="booking-modal-body">
              <Form onSubmit={handleBookingSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tarih</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Saat</Form.Label>
                  <Form.Control
                    type="time"
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Lütfen eğitmenin müsait saatlerini ({selectedTrainer.availabilityHours}) göz önünde bulundurun.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mesaj (İsteğe Bağlı)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Eğitmene iletmek istediğiniz bilgileri yazın..."
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Randevuyu Onayla
                </Button>
              </Form>
            </div>
          </div>
        </div>
      )}

      {/* Değerlendirmeler Modal */}
      <Modal 
        show={showReviewsModal} 
        onHide={() => setShowReviewsModal(false)}
        size="lg"
        centered
        className="reviews-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedTrainer && `${selectedTrainer.name} - Değerlendirmeler`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTrainer && (
            <div className="trainer-reviews-container">
              <div className="trainer-rating-summary mb-4">
                <Row className="align-items-center">
                  <Col md={4} className="text-center">
                    <div className="rating-big mb-2">{selectedTrainer.rating.toFixed(1)}</div>
                    <div className="d-flex justify-content-center">
                      {renderStarRating(selectedTrainer.rating)}
                    </div>
                    <div className="text-muted mt-1">
                      {selectedTrainer.reviewCount} değerlendirme
                    </div>
                  </Col>
                  <Col md={8}>
                    <p>
                      <strong>{selectedTrainer.name}</strong>, 
                      {selectedTrainer.experience} deneyimi ile {selectedTrainer.title} 
                      olarak hizmet vermektedir. Öğrencilerinden aldığı yüksek puanlar ve olumlu 
                      geri bildirimler, profesyonelliğini ve eğitmenlik kalitesini göstermektedir.
                    </p>
                  </Col>
                </Row>
              </div>

              <hr />

              <div className="trainer-reviews-list">
                <h5 className="mb-3">Tüm Değerlendirmeler</h5>
                
                {selectedTrainerReviews.length > 0 ? (
                  selectedTrainerReviews.map(review => (
                    <div key={review.id} className="review-item mb-4">
                      <div className="review-header d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex align-items-center">
                          <div className="review-avatar">
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                          <div className="ms-2">
                            <h6 className="mb-0">{review.name}</h6>
                            <div className="d-flex align-items-center">
                              <div className="me-2">
                                {renderStarRating(review.rating, "xs")}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="review-date">
                          <FontAwesomeIcon icon={faClock} className="me-1" size="xs" />
                          <small>{review.date}</small>
                        </div>
                      </div>
                      <div className="review-content">
                        <FontAwesomeIcon icon={faQuoteLeft} className="me-2 text-muted" size="xs" />
                        {review.comment}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">Henüz değerlendirme bulunmamaktadır.</p>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewsModal(false)}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Trainers; 
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form, Alert, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle, faCreditCard, faThumbsUp, faSpinner, faTag, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Memberships.css';

const Memberships = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [membershipDuration, setMembershipDuration] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [promoCodeError, setPromoCodeError] = useState('');
  
  // Geçerli promosyon kodları
  const validPromoCodes = [
    { code: 'YİĞİT10', discount: 10 },
    { code: 'MATFIT15', discount: 15 },
    { code: 'YENI20', discount: 20 },
    { code: 'İSMET16', discount: 16 }
  ];
  
  // Üyelik planları
  const membershipPlans = [
    {
      id: 1,
      name: 'Temel Üyelik',
      price: 199,
      duration: 'aylık',
      color: 'primary',
      features: [
        { text: 'Sınırsız spor salonu erişimi', included: true },
        { text: 'Temel fitness ekipmanlarına erişim', included: true },
        { text: 'Mobil uygulama erişimi', included: true },
        { text: 'Kişisel antrenman programı', included: false },
        { text: 'Grup dersleri', included: false },
        { text: 'Özel antrenör desteği', included: false },
        { text: 'Sauna ve havuz erişimi', included: false }
      ]
    },
    {
      id: 2,
      name: 'Premium Üyelik',
      price: 349,
      duration: 'aylık',
      color: 'warning',
      popular: true,
      features: [
        { text: 'Sınırsız spor salonu erişimi', included: true },
        { text: 'Tüm fitness ekipmanlarına erişim', included: true },
        { text: 'Mobil uygulama erişimi', included: true },
        { text: 'Kişisel antrenman programı', included: true },
        { text: 'Haftada 4 grup dersi', included: true },
        { text: 'Ayda 2 özel antrenör seansı', included: true },
        { text: 'Sauna ve havuz erişimi', included: false }
      ]
    },
    {
      id: 3,
      name: 'VIP Üyelik',
      price: 599,
      duration: 'aylık',
      color: 'danger',
      features: [
        { text: 'Sınırsız spor salonu erişimi', included: true },
        { text: 'Tüm fitness ekipmanlarına erişim', included: true },
        { text: 'Mobil uygulama erişimi', included: true },
        { text: 'Kişisel antrenman programı', included: true },
        { text: 'Sınırsız grup dersleri', included: true },
        { text: 'Haftada 2 özel antrenör seansı', included: true },
        { text: 'Sauna ve havuz erişimi', included: true }
      ]
    }
  ];

  // Avantajlı paketler (3, 6, 12 aylık)
  const discountPackages = [
    { months: 3, discount: 10 },
    { months: 6, discount: 15 },
    { months: 12, discount: 25 }
  ];

  // Üyelik satın alma modalını açma
  const handlePurchase = (plan) => {
    setSelectedPlan(plan);
    setMembershipDuration(1);
    setShowModal(true);
    setPromoCode('');
    setPromoDiscount(0);
    setPromoCodeApplied(false);
    setPromoCodeError('');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      birthDate: '',
      cardName: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      agreeTerms: false
    });
    setErrors({});
  };

  // Form alanlarını güncelleme
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Hata varsa temizle
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Üyelik süresini değiştirme
  const handleDurationChange = (months) => {
    setMembershipDuration(months);
  };

  // Promosyon kodu uygulama
  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      setPromoCodeError('Lütfen promosyon kodu girin');
      return;
    }

    if (promoCodeApplied) {
      setPromoCodeError('Zaten bir promosyon kodu uygulandı');
      return;
    }

    const foundPromoCode = validPromoCodes.find(
      code => code.code.toUpperCase() === promoCode.trim().toUpperCase()
    );

    if (foundPromoCode) {
      setPromoDiscount(foundPromoCode.discount);
      setPromoCodeApplied(true);
      setPromoCodeError('');
    } else {
      setPromoCodeError('Geçersiz promosyon kodu');
    }
  };

  // Promosyon kodu temizleme
  const clearPromoCode = () => {
    setPromoCode('');
    setPromoDiscount(0);
    setPromoCodeApplied(false);
    setPromoCodeError('');
  };

  // Toplam fiyat hesaplama
  const calculateTotalPrice = () => {
    if (!selectedPlan) return 0;

    let basePrice = selectedPlan.price;
    
    // Üyelik süresi indirimi
    if (membershipDuration > 1) {
      const durationDiscount = discountPackages.find(p => p.months === membershipDuration).discount;
      basePrice = basePrice * (1 - durationDiscount / 100);
    }
    
    // Promosyon kodu indirimi
    if (promoCodeApplied) {
      basePrice = basePrice * (1 - promoDiscount / 100);
    }
    
    return Math.round(basePrice);
  };

  // Form doğrulama
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Ad Soyad gerekli';
    if (!formData.email.trim()) newErrors.email = 'E-posta gerekli';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçerli bir e-posta girin';
    
    if (!formData.phone.trim()) newErrors.phone = 'Telefon gerekli';
    if (!formData.birthDate) newErrors.birthDate = 'Doğum tarihi gerekli';
    
    if (!formData.cardName.trim()) newErrors.cardName = 'Kart üzerindeki isim gerekli';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Kart numarası gerekli';
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) 
      newErrors.cardNumber = 'Geçerli bir kart numarası girin';
    
    if (!formData.expiryMonth) newErrors.expiryMonth = 'Ay seçin';
    if (!formData.expiryYear) newErrors.expiryYear = 'Yıl seçin';
    
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV gerekli';
    else if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = 'Geçerli bir CVV girin';
    
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Şartları kabul etmelisiniz';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Ödeme işlemini gerçekleştir
  const handlePayment = () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Ödeme işlemi simülasyonu
    setTimeout(() => {
      setLoading(false);
      setShowModal(false);
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <div className="memberships-page">
      {/* Hero Section */}
      <section className="memberships-hero">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h1>ÜYELİK PLANLARI</h1>
              <p className="lead">
                İhtiyaçlarınıza ve hedeflerinize en uygun üyelik planını seçin ve 
                fitness yolculuğunuza bugün başlayın.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Üyelik Planları */}
      <section className="membership-plans">
        <Container>
          <Row>
            {membershipPlans.map((plan) => (
              <Col lg={4} md={6} key={plan.id} className="mb-4">
                <Card className={`membership-card ${plan.popular ? 'popular' : ''}`}>
                  {plan.popular && (
                    <div className="popular-badge">
                      <span>En Popüler</span>
                    </div>
                  )}
                  <Card.Body>
                    <div className="membership-header">
                      <h3 className={`plan-name text-${plan.color}`}>{plan.name}</h3>
                      <div className="plan-price">
                        <span className="currency">₺</span>
                        <span className="amount">{plan.price}</span>
                        <span className="duration">/{plan.duration}</span>
                      </div>
                    </div>
                    <div className="membership-features">
                      <ul>
                        {plan.features.map((feature, index) => (
                          <li key={index} className={feature.included ? 'included' : 'excluded'}>
                            {feature.included ? (
                              <FontAwesomeIcon icon={faCheck} className="feature-icon included" />
                            ) : (
                              <FontAwesomeIcon icon={faTimes} className="feature-icon excluded" />
                            )}
                            {feature.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button 
                      variant={plan.color} 
                      className="w-100 membership-button"
                      onClick={() => handlePurchase(plan)}
                    >
                      Şimdi Üye Ol
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Uzun Dönem Üyelik Avantajları */}
          <Row className="mt-5">
            <Col lg={12}>
              <div className="long-term-discount">
                <h3 className="text-center mb-4">Uzun Dönem Üyelik Avantajları</h3>
                <p className="text-center mb-4">
                  Daha uzun süreli üyeliklerde özel indirimlerden yararlanın.
                </p>
                <Table responsive className="discount-table">
                  <thead>
                    <tr>
                      <th>Üyelik Süresi</th>
                      <th>İndirim Oranı</th>
                      <th>Aylık Ücret (Temel)</th>
                      <th>Aylık Ücret (Premium)</th>
                      <th>Aylık Ücret (VIP)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1 Ay</td>
                      <td><Badge bg="secondary">0%</Badge></td>
                      <td>₺199</td>
                      <td>₺349</td>
                      <td>₺599</td>
                    </tr>
                    {discountPackages.map((pack, index) => (
                      <tr key={index}>
                        <td>{pack.months} Ay</td>
                        <td><Badge bg="success">{pack.discount}%</Badge></td>
                        <td>₺{Math.round(199 * (1 - pack.discount / 100))}</td>
                        <td>₺{Math.round(349 * (1 - pack.discount / 100))}</td>
                        <td>₺{Math.round(599 * (1 - pack.discount / 100))}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Üyelik Avantajları */}
      <section className="membership-benefits">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2>ÜYELİK AVANTAJLARI</h2>
              <p className="lead">
                MatFit üyeliği ile sadece fitness ekipmanlarına değil, 
                çok daha fazlasına erişim sağlarsınız.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={4} className="mb-4">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <h4>Esnek Saatler</h4>
                <p>Haftanın 7 günü 06:00-00:00 arası dilediğiniz zaman antrenman yapabilirsiniz.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <h4>Modern Ekipmanlar</h4>
                <p>En son teknoloji fitness ekipmanları ile antrenmanlarınızı daha verimli hale getirin.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <h4>Profesyonel Eğitmenler</h4>
                <p>Alanında uzman eğitmenlerimizden kişiselleştirilmiş antrenman programları alın.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Üyelik Bilgileri Modalı */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedPlan && `${selectedPlan.name} Satın Alma`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPlan && (
            <>
              <div className="selected-plan-info mb-4">
                <h4>Seçilen Plan: {selectedPlan.name}</h4>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="plan-price-modal">
                    <span className="currency">₺</span>
                    <span className="amount">{calculateTotalPrice()}</span>
                    <span className="duration">/{selectedPlan.duration}</span>
                    
                    {membershipDuration > 1 && (
                      <Badge bg="success" className="ms-2">
                        {discountPackages.find(p => p.months === membershipDuration).discount}% süre indirimi
                      </Badge>
                    )}
                    
                    {promoCodeApplied && (
                      <Badge bg="info" className="ms-2">
                        {promoDiscount}% kupon indirimi
                      </Badge>
                    )}
                  </div>
                  
                  {promoCodeApplied && (
                    <div className="original-price text-muted text-decoration-line-through">
                      Orijinal: ₺{membershipDuration === 1 
                        ? selectedPlan.price
                        : Math.round(selectedPlan.price * (1 - discountPackages.find(p => p.months === membershipDuration).discount / 100))
                      }
                    </div>
                  )}
                </div>
              </div>

              <Form noValidate>
                <h5 className="mb-3">Üyelik Süresi Seçin</h5>
                <Form.Group className="mb-4">
                  <Row>
                    <Col>
                      <Form.Check
                        type="radio"
                        label="1 Aylık"
                        name="membershipDuration"
                        id="duration-1"
                        checked={membershipDuration === 1}
                        onChange={() => handleDurationChange(1)}
                      />
                      <small className="text-muted d-block mt-1">
                        ₺{selectedPlan.price} / ay
                      </small>
                    </Col>
                    {discountPackages.map((pack, index) => (
                      <Col key={index}>
                        <Form.Check
                          type="radio"
                          label={`${pack.months} Aylık`}
                          name="membershipDuration"
                          id={`duration-${pack.months}`}
                          checked={membershipDuration === pack.months}
                          onChange={() => handleDurationChange(pack.months)}
                        />
                        <small className="text-muted d-block mt-1">
                          ₺{Math.round(selectedPlan.price * (1 - pack.discount / 100))} / ay
                          <Badge bg="success" className="ms-2">{pack.discount}% indirim</Badge>
                        </small>
                      </Col>
                    ))}
                  </Row>
                </Form.Group>

                {/* Promosyon Kodu */}
                <Form.Group className="mb-4">
                  <h5 className="mb-3">
                    <FontAwesomeIcon icon={faTag} className="me-2" />
                    Promosyon Kodu
                  </h5>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Promosyon kodunuzu girin"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoCodeApplied}
                      isInvalid={!!promoCodeError}
                    />
                    {promoCodeApplied ? (
                      <Button 
                        variant="outline-secondary" 
                        onClick={clearPromoCode}
                      >
                        Temizle
                      </Button>
                    ) : (
                      <Button 
                        variant="outline-primary" 
                        onClick={applyPromoCode}
                      >
                        Uygula
                      </Button>
                    )}
                  </InputGroup>
                  {promoCodeError && (
                    <div className="text-danger mt-1 small">{promoCodeError}</div>
                  )}
                  {promoCodeApplied && (
                    <div className="text-success mt-1 small">
                      <FontAwesomeIcon icon={faCheckCircle} className="me-1" />
                      "{promoCode}" kodu uygulandı - %{promoDiscount} indirim
                    </div>
                  )}
                </Form.Group>

                <h5 className="mb-3">Kişisel Bilgiler</h5>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ad Soyad</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Ad Soyad"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        isInvalid={!!errors.fullName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fullName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>E-posta</Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="E-posta"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Telefon</Form.Label>
                      <Form.Control 
                        type="tel" 
                        placeholder="Telefon"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Doğum Tarihi</Form.Label>
                      <Form.Control 
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        isInvalid={!!errors.birthDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.birthDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="payment-info mt-4">
                  <h5 className="mb-3">
                    <FontAwesomeIcon icon={faCreditCard} className="me-2" />
                    Ödeme Bilgileri
                  </h5>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Kart Üzerindeki İsim</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Kart Üzerindeki İsim"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          isInvalid={!!errors.cardName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cardName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Kart Numarası</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="**** **** **** ****"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          isInvalid={!!errors.cardNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cardNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Son Kullanma Tarihi</Form.Label>
                        <Row>
                          <Col>
                            <Form.Select 
                              name="expiryMonth"
                              value={formData.expiryMonth}
                              onChange={handleInputChange}
                              isInvalid={!!errors.expiryMonth}
                            >
                              <option value="">Ay</option>
                              {[...Array(12)].map((_, i) => (
                                <option key={i} value={i + 1}>{i + 1}</option>
                              ))}
                            </Form.Select>
                            {errors.expiryMonth && (
                              <div className="invalid-feedback d-block">
                                {errors.expiryMonth}
                              </div>
                            )}
                          </Col>
                          <Col>
                            <Form.Select
                              name="expiryYear"
                              value={formData.expiryYear}
                              onChange={handleInputChange}
                              isInvalid={!!errors.expiryYear}
                            >
                              <option value="">Yıl</option>
                              {[...Array(10)].map((_, i) => (
                                <option key={i} value={new Date().getFullYear() + i}>
                                  {new Date().getFullYear() + i}
                                </option>
                              ))}
                            </Form.Select>
                            {errors.expiryYear && (
                              <div className="invalid-feedback d-block">
                                {errors.expiryYear}
                              </div>
                            )}
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="***" 
                          maxLength="3"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          isInvalid={!!errors.cvv}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cvv}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

                <div className="terms-info mt-4">
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      isInvalid={!!errors.agreeTerms}
                      label={
                        <span>
                          <a href="/terms" className="text-decoration-underline" target="_blank">
                            Üyelik şartları ve koşullarını
                          </a> okudum ve kabul ediyorum.
                        </span>
                      }
                    />
                    {errors.agreeTerms && (
                      <div className="invalid-feedback d-block">
                        {errors.agreeTerms}
                      </div>
                    )}
                  </Form.Group>
                </div>
              </Form>

              <div className="info-box mt-3">
                <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                <small>
                  Ödemeniz güvenli bir şekilde işlenecektir. Seçtiğiniz üyelik planı, ödeme onayından hemen sonra aktif hale gelecektir.
                </small>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <div className="total-price">
              <h5 className="mb-0">Toplam: <span className="text-primary">₺{calculateTotalPrice()}</span></h5>
              {promoCodeApplied && (
                <small className="text-success">%{promoDiscount} indirim uygulandı</small>
              )}
            </div>
            <div>
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                İptal
              </Button>
              <Button variant="primary" onClick={handlePayment} disabled={loading}>
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                    İşleniyor...
                  </>
                ) : (
                  'Ödemeyi Tamamla'
                )}
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Başarılı Mesaj Modalı */}
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>
            <FontAwesomeIcon icon={faThumbsUp} className="me-2" />
            Ödeme Başarılı
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="success-icon">
            <FontAwesomeIcon icon={faCheckCircle} className="text-success" size="3x" />
          </div>
          <h4 className="mt-4">Tebrikler!</h4>
          <p>Üyelik işleminiz başarıyla tamamlandı.</p>
          <p>Üyelik bilgileriniz e-posta adresinize gönderildi.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccess(false)} className="w-100">
            Tamam
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Memberships; 
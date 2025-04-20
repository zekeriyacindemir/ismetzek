import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Tabs,
  Tab,
  Badge,
  Modal,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faEdit,
  faKey,
  faHistory,
  faSave,
  faTimes,
  faCalendar,
  faRulerVertical,
  faWeight,
  faCamera,
  faTrash,
  faCrown,
  faCreditCard,
  faInfoCircle,
  faExclamationTriangle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

// Profil bilgilerini güncelleme şeması
const profileSchema = Yup.object({
  name: Yup.string()
    .min(2, "İsim en az 2 karakter olmalıdır")
    .required("İsim gerekli"),
  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta adresi gerekli"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Sadece rakam giriniz")
    .min(10, "Telefon numarası en az 10 karakter olmalıdır")
    .required("Telefon numarası gerekli"),
  height: Yup.number()
    .min(100, "Boy en az 100 cm olmalıdır")
    .max(250, "Boy en fazla 250 cm olabilir")
    .required("Boy gerekli"),
  weight: Yup.number()
    .min(30, "Kilo en az 30 kg olmalıdır")
    .max(200, "Kilo en fazla 200 kg olabilir")
    .required("Kilo gerekli"),
  birthDate: Yup.date()
    .max(new Date(), "Doğum tarihi bugünden ileri bir tarih olamaz")
    .required("Doğum tarihi gerekli"),
});

// Şifre değişikliği şeması
const passwordSchema = Yup.object({
  currentPassword: Yup.string().required("Mevcut şifre gerekli"),
  newPassword: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Yeni şifre gerekli"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Şifreler eşleşmiyor")
    .required("Şifre onayı gerekli"),
});

const Profile = () => {
  const {
    user,
    updateUserProfile,
    changePassword,
    logout,
    uploadProfileImage,
    removeProfileImage,
  } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileSuccess, setProfileSuccess] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [nutritionHistory, setNutritionHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [imagePreview, setImagePreview] = useState(user?.profileImage || null);
  const fileInputRef = useRef(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [membershipInfo, setMembershipInfo] = useState({
    type: "Premium",
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    autoRenew: true,
    price: "199.99",
    billingCycle: "Yıllık",
    status: "Aktif",
  });

  // Kullanıcının geçmiş antrenman ve beslenme planlarını yükle
  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        setLoading(true);
        // Bu kısımda gerçek API çağrıları yapılacak
        // Örnek veri simülasyonu:
        setTimeout(() => {
          setWorkoutHistory([
            {
              id: 1,
              date: "2023-06-01",
              name: "Göğüs Antrenmanı",
              status: "tamamlandı",
            },
            {
              id: 2,
              date: "2023-06-03",
              name: "Bacak Günü",
              status: "tamamlandı",
            },
            {
              id: 3,
              date: "2023-06-05",
              name: "Kol ve Omuz",
              status: "tamamlandı",
            },
            {
              id: 4,
              date: "2023-06-07",
              name: "Sırt Antrenmanı",
              status: "iptal edildi",
            },
          ]);

          setNutritionHistory([
            {
              id: 1,
              date: "2023-06-01",
              name: "Protein Ağırlıklı Beslenme",
              status: "aktif",
            },
            {
              id: 2,
              date: "2023-05-15",
              name: "Kilo Verme Programı",
              status: "tamamlandı",
            },
          ]);

          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Kullanıcı geçmişi yüklenirken hata oluştu:", error);
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, []);

  const handleProfileUpdate = async (values, { setSubmitting }) => {
    try {
      setProfileError(null);
      setProfileSuccess(null);

      await updateUserProfile(values);
      setProfileSuccess("Profil bilgileriniz başarıyla güncellendi.");
    } catch (err) {
      setProfileError(
        err.response?.data?.message ||
          "Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setSubmitting(false);
      // 3 saniye sonra başarı ve hata mesajlarını temizle
      setTimeout(() => {
        setProfileSuccess(null);
        setProfileError(null);
      }, 3000);
    }
  };

  const handlePasswordChange = async (values, { setSubmitting, resetForm }) => {
    try {
      setPasswordError(null);
      setPasswordSuccess(null);

      await changePassword(values.currentPassword, values.newPassword);
      setPasswordSuccess("Şifreniz başarıyla güncellendi.");
      resetForm();
    } catch (err) {
      setPasswordError(
        err.response?.data?.message ||
          "Şifre değiştirilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setSubmitting(false);
      // 3 saniye sonra başarı ve hata mesajlarını temizle
      setTimeout(() => {
        setPasswordSuccess(null);
        setPasswordError(null);
      }, 3000);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setProfileError("Profil fotoğrafı 5MB'dan büyük olamaz.");
        return;
      }

      // Dosya tipi kontrolü
      if (!file.type.match("image/(jpeg|png|jpg)")) {
        setProfileError(
          "Sadece JPEG, PNG veya JPG formatında resim yükleyebilirsiniz."
        );
        return;
      }

      setProfileImage(file);

      // Önizleme oluştur
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!profileImage) return;

    try {
      setLoading(true);
      setProfileError(null);

      await uploadProfileImage(profileImage);
      setProfileSuccess("Profil fotoğrafınız başarıyla güncellendi.");

      // 3 saniye sonra başarı mesajını temizle
      setTimeout(() => {
        setProfileSuccess(null);
      }, 3000);
    } catch (error) {
      setProfileError("Profil fotoğrafı güncellenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    try {
      setLoading(true);
      setProfileError(null);

      await removeProfileImage();
      setProfileImage(null);
      setImagePreview(null);
      setProfileSuccess("Profil fotoğrafınız başarıyla kaldırıldı.");

      // 3 saniye sonra başarı mesajını temizle
      setTimeout(() => {
        setProfileSuccess(null);
      }, 3000);
    } catch (error) {
      setProfileError("Profil fotoğrafı kaldırılırken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelMembership = () => {
    setShowCancelModal(true);
  };

  const confirmCancelMembership = async () => {
    try {
      setLoading(true);
      // Gerçek uygulamada burada API'ye istek gönderilecek
      // await cancelMembership();

      // Mock başarılı yanıt
      setMembershipInfo({
        ...membershipInfo,
        status: "İptal Edildi",
        autoRenew: false,
      });

      setShowCancelModal(false);
      setProfileSuccess(
        "Üyeliğiniz başarıyla iptal edildi. Mevcut üyelik süreniz sonuna kadar devam edecektir."
      );

      // 5 saniye sonra başarı mesajını temizle
      setTimeout(() => {
        setProfileSuccess(null);
      }, 5000);
    } catch (error) {
      setProfileError(
        "Üyelik iptal edilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  };

  // Profil tabı içeriği
  const renderProfileTab = () => (
    <Formik
      initialValues={{
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        height: user?.height || "",
        weight: user?.weight || "",
        birthDate: user?.birthDate || "",
      }}
      validationSchema={profileSchema}
      onSubmit={handleProfileUpdate}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          {profileSuccess && (
            <Alert variant="success" className="mb-4">
              {profileSuccess}
            </Alert>
          )}

          {profileError && (
            <Alert variant="danger" className="mb-4">
              {profileError}
            </Alert>
          )}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-4" controlId="name">
                <Form.Label className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  İsim Soyisim
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4" controlId="email">
                <Form.Label className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  E-posta Adresi
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4" controlId="phone">
                <Form.Label className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faPhone} className="me-2" />
                  Telefon Numarası
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.phone && errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4" controlId="birthDate">
                <Form.Label className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faCalendar} className="me-2" />
                  Doğum Tarihi
                </Form.Label>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={values.birthDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.birthDate && errors.birthDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.birthDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4" controlId="height">
                <Form.Label className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faRulerVertical} className="me-2" />
                  Boy (cm)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="height"
                  value={values.height}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.height && errors.height}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.height}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4" controlId="weight">
                <Form.Label className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faWeight} className="me-2" />
                  Kilo (kg)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  value={values.weight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.weight && errors.weight}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.weight}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-2 d-flex justify-content-end">
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faSave} className="me-2" />
              {isSubmitting ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );

  // Şifre değiştirme tabı içeriği
  const renderPasswordTab = () => (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={passwordSchema}
      onSubmit={handlePasswordChange}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          {passwordSuccess && (
            <Alert variant="success" className="mb-4">
              {passwordSuccess}
            </Alert>
          )}

          {passwordError && (
            <Alert variant="danger" className="mb-4">
              {passwordError}
            </Alert>
          )}

          <Row>
            <Col md={12}>
              <Form.Group className="mb-4" controlId="currentPassword">
                <Form.Label>Mevcut Şifre</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  value={values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.currentPassword && errors.currentPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.currentPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4" controlId="newPassword">
                <Form.Label>Yeni Şifre</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.newPassword && errors.newPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.newPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4" controlId="confirmPassword">
                <Form.Label>Yeni Şifre Tekrarı</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.confirmPassword && errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-2 d-flex justify-content-end">
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faKey} className="me-2" />
              {isSubmitting ? "Güncelleniyor..." : "Şifreyi Güncelle"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );

  // Geçmiş sekmesi içeriği
  const renderHistoryTab = () => (
    <div className="history-tab">
      <h4 className="mb-4">Antrenman Geçmişi</h4>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : workoutHistory.length > 0 ? (
        <div className="history-list mb-5">
          {workoutHistory.map((workout) => (
            <div key={workout.id} className="history-item">
              <div className="history-date">{workout.date}</div>
              <div className="history-details">
                <h5>{workout.name}</h5>
                <Badge
                  bg={
                    workout.status === "tamamlandı"
                      ? "success"
                      : workout.status === "aktif"
                      ? "primary"
                      : "danger"
                  }
                >
                  {workout.status}
                </Badge>
              </div>
              <div className="history-actions">
                <Button variant="outline-primary" size="sm">
                  Detaylar
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Henüz antrenman geçmişiniz bulunmuyor.</p>
      )}

      <h4 className="mb-4">Beslenme Planı Geçmişi</h4>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : nutritionHistory.length > 0 ? (
        <div className="history-list">
          {nutritionHistory.map((plan) => (
            <div key={plan.id} className="history-item">
              <div className="history-date">{plan.date}</div>
              <div className="history-details">
                <h5>{plan.name}</h5>
                <Badge
                  bg={
                    plan.status === "tamamlandı"
                      ? "success"
                      : plan.status === "aktif"
                      ? "primary"
                      : "danger"
                  }
                >
                  {plan.status}
                </Badge>
              </div>
              <div className="history-actions">
                <Button variant="outline-primary" size="sm">
                  Detaylar
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Henüz beslenme planı geçmişiniz bulunmuyor.</p>
      )}
    </div>
  );

  // Üyelik tabı içeriği
  const renderMembershipTab = () => (
    <div className="membership-tab">
      <Card className="membership-card mb-4">
        <Card.Body>
          <div className="membership-header">
            <div className="membership-icon">
              <FontAwesomeIcon icon={faCrown} />
            </div>
            <div className="membership-title">
              <h3>{membershipInfo.type} Üyelik</h3>
              <Badge
                bg={membershipInfo.status === "Aktif" ? "success" : "danger"}
              >
                {membershipInfo.status}
              </Badge>
            </div>
          </div>

          <div className="membership-details">
            <div className="membership-info-item">
              <div className="info-label">
                <FontAwesomeIcon icon={faCalendar} className="me-2" />
                Başlangıç Tarihi
              </div>
              <div className="info-value">
                {new Date(membershipInfo.startDate).toLocaleDateString("tr-TR")}
              </div>
            </div>

            <div className="membership-info-item">
              <div className="info-label">
                <FontAwesomeIcon icon={faCalendar} className="me-2" />
                Bitiş Tarihi
              </div>
              <div className="info-value">
                {new Date(membershipInfo.endDate).toLocaleDateString("tr-TR")}
              </div>
            </div>

            <div className="membership-info-item">
              <div className="info-label">
                <FontAwesomeIcon icon={faCreditCard} className="me-2" />
                Ödeme Döngüsü
              </div>
              <div className="info-value">{membershipInfo.billingCycle}</div>
            </div>

            <div className="membership-info-item">
              <div className="info-label">
                <FontAwesomeIcon icon={faCreditCard} className="me-2" />
                Ücret
              </div>
              <div className="info-value">{membershipInfo.price} TL</div>
            </div>

            <div className="membership-info-item">
              <div className="info-label">
                <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                Otomatik Yenileme
              </div>
              <div className="info-value">
                {membershipInfo.autoRenew ? "Aktif" : "Pasif"}
              </div>
            </div>
          </div>

          {membershipInfo.status === "Aktif" && (
            <div className="membership-actions mt-4">
              <Button
                variant="outline-danger"
                onClick={handleCancelMembership}
                className="cancel-membership-btn"
              >
                <FontAwesomeIcon icon={faTimes} className="me-2" />
                Üyeliği İptal Et
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      <Card className="membership-benefits-card">
        <Card.Body>
          <h4 className="mb-3">Üyelik Avantajları</h4>
          <ul className="benefits-list">
            <li>
              <FontAwesomeIcon icon={faCheck} className="me-2 text-success" />
              Sınırsız antrenman programı erişimi
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className="me-2 text-success" />
              Kişiselleştirilmiş beslenme planları
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className="me-2 text-success" />
              Antrenör desteği ve danışmanlık
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className="me-2 text-success" />
              İlerleme takibi ve raporlama
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className="me-2 text-success" />
              Mobil uygulama erişimi
            </li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div className="profile-page">
      <Container>
        <div className="profile-header">
          <div className="profile-avatar">
            {imagePreview ? (
              <div className="avatar-image">
                <img src={imagePreview} alt="Profil" />
              </div>
            ) : (
              <div className="avatar-circle">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
            <div className="avatar-actions">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/jpeg,image/png,image/jpg"
                style={{ display: "none" }}
              />
              <Button
                variant="link"
                className="edit-avatar-btn"
                onClick={() => fileInputRef.current.click()}
                title="Fotoğraf Yükle"
              >
                <FontAwesomeIcon icon={faCamera} />
              </Button>
              {imagePreview && (
                <Button
                  variant="link"
                  className="remove-avatar-btn"
                  onClick={handleRemoveImage}
                  title="Fotoğrafı Kaldır"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              )}
            </div>
            {profileImage && !imagePreview && (
              <Button
                variant="primary"
                size="sm"
                className="upload-image-btn"
                onClick={handleImageUpload}
                disabled={loading}
              >
                {loading ? "Yükleniyor..." : "Fotoğrafı Kaydet"}
              </Button>
            )}
          </div>
          <div className="profile-info">
            <h2>{user?.name}</h2>
            <p className="email">{user?.email}</p>
            <p className="membership">{membershipInfo.type} Üyelik</p>
          </div>
        </div>

        <Card className="profile-card mt-4">
          <Card.Body>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-4 profile-tabs"
            >
              <Tab eventKey="profile" title="Profil Bilgileri">
                {renderProfileTab()}
              </Tab>
              <Tab eventKey="membership" title="Üyelik Bilgileri">
                {renderMembershipTab()}
              </Tab>
              <Tab eventKey="password" title="Şifre Değiştir">
                {renderPasswordTab()}
              </Tab>
              <Tab eventKey="history" title="Geçmiş">
                {renderHistoryTab()}
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>

      {/* Üyelik İptal Modal */}
      <Modal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-warning me-2"
            />
            Üyelik İptali
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Üyeliğinizi iptal etmek istediğinizden emin misiniz?</p>

          <div className="cancel-info mt-3">
            <h5>Önemli Bilgiler:</h5>
            <ul>
              <li>
                Üyeliğiniz iptal edildiğinde, mevcut üyelik süreniz sonuna kadar
                hizmetlerimizden yararlanmaya devam edebilirsiniz.
              </li>
              <li>
                Üyelik süreniz dolduğunda otomatik yenileme işlemi
                gerçekleşmeyecektir.
              </li>
              <li>
                İptal işlemi geri alınamaz. Üyeliğinizi tekrar aktifleştirmek
                için yeni bir üyelik satın almanız gerekecektir.
              </li>
              <li>
                Üyelik iptali, önceden satın alınmış ve kullanılmamış
                hizmetlerin iadesini gerektirmez.
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Vazgeç
          </Button>
          <Button
            variant="danger"
            onClick={confirmCancelMembership}
            disabled={loading}
          >
            {loading ? "İptal Ediliyor..." : "Üyeliği İptal Et"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;

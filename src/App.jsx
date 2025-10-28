// App.jsx
import { useState } from 'react';
import HomePage from './components/HomePage';
import CourseDetail from './components/CourseDetail';
import AuthPage from './components/AuthPage';
import PaymentPage from './components/PaymentPage';
import CourseLearning from './components/CourseLearning';
import { courses } from './data/courses';
import './base.css';
import './components/homepage.css';
import './components/coursedetail.css';
import './components/courselearning.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setCurrentPage('detail');
  };

  const handleBack = () => {
    setCurrentPage('home');
    setSelectedCourse(null);
  };

  const handleEnroll = (course) => {
    setSelectedCourse(course);
    if (user) {
      setCurrentPage('payment');
    } else {
      setCurrentPage('auth');
    }
  };

  const handleAuth = (userData) => {
    setUser(userData);
    setCurrentPage('payment');
  };

  const handlePaymentComplete = () => {
    const courseWithProgress = {
      ...selectedCourse,
      completedLessons: {}
    };
    setEnrolledCourses([...enrolledCourses, courseWithProgress]);
    setCurrentPage('learning');
  };

  const handleBackToDetail = () => {
    setCurrentPage('detail');
  };

  const handleGoToLearning = (course) => {
    setSelectedCourse(course);
    setCurrentPage('learning');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedCourse(null);
  };

  if (currentPage === 'learning' && selectedCourse) {
    return (
      <CourseLearning
        course={selectedCourse}
        user={user}
        enrolledCourses={enrolledCourses}
        onGoToCourse={handleGoToLearning}
        onBackToHome={handleBackToHome}
      />
    );
  }

  if (currentPage === 'payment' && selectedCourse) {
    return (
      <PaymentPage 
        course={selectedCourse} 
        user={user}
        onBack={handleBackToDetail}
        onComplete={handlePaymentComplete}
      />
    );
  }

  if (currentPage === 'auth' && selectedCourse) {
    return (
      <AuthPage 
        course={selectedCourse}
        onAuth={handleAuth}
        onBack={handleBackToDetail}
      />
    );
  }

  if (currentPage === 'detail' && selectedCourse) {
    return (
      <CourseDetail 
        course={selectedCourse} 
        onBack={handleBack}
        onEnroll={handleEnroll}
      />
    );
  }

  return <HomePage onCourseClick={handleCourseClick} courses={courses} />;
}

export default App;
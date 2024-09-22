import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../src/pages/Home';
import Profile from '../src/pages/Profile';
import Dashboard from '../src/pages/Dashboard';
import AdminSkillEvaluator from './pages/AdminSkillEvaluator';
import ExamPage from './pages/ExamPage';
import StudentSkillEvaluator from './pages/StudentSkillEvaluator';
import JobRoleRecommendation from './pages/JobRoleRecommendation';
import CareerRoadmap from './pages/CareerRoadmap';
import QuickRevision from './pages/QuickRevision';
import AdminCreateOpportunity from './pages/AdminCreateOpportunity';
import Opportunities from './pages/Opportunities';
import ResumeBuilder from './pages/ResumeBuilder';
import CareerCoach from './pages/CareerCoach';
import InterviewPreparation from './pages/InterviewPreparation';
import About from './components/About';
import CareerRoadmapGraphView from './pages/CareerRoadmapGraphView';
import SignInPage from './pages/SigninPage';
import BlogPage from './pages/BlogPage';
import ResourceLibrary from './pages/ResourceLibrary';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* Protected routes */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admindashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/adminskillsadd" element={<ProtectedRoute><AdminSkillEvaluator /></ProtectedRoute>} />
          <Route path="/student-skill-evaluator" element={<ProtectedRoute><StudentSkillEvaluator /></ProtectedRoute>} />
          <Route path="/exam/:domain" element={<ProtectedRoute><ExamPage /></ProtectedRoute>} />
          <Route path="/career-coach" element={<ProtectedRoute><CareerCoach /></ProtectedRoute>} />
          <Route path="/interview-prep" element={<ProtectedRoute><InterviewPreparation /></ProtectedRoute>} />
          <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
          <Route path="/path-finder" element={<ProtectedRoute><CareerRoadmap /></ProtectedRoute>} />
          <Route path="/job-matcher" element={<ProtectedRoute><JobRoleRecommendation /></ProtectedRoute>} />
          <Route path="/quick-revision" element={<ProtectedRoute><QuickRevision /></ProtectedRoute>} />
          <Route path="/adminjobadd" element={<ProtectedRoute><AdminCreateOpportunity /></ProtectedRoute>} />
          <Route path="/find-opportunity" element={<ProtectedRoute><Opportunities /></ProtectedRoute>} />
          <Route path="/graphview" element={<ProtectedRoute><CareerRoadmapGraphView /></ProtectedRoute>} />
          <Route path="/blogs" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
          <Route path="/resource-library" element={<ProtectedRoute><ResourceLibrary /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

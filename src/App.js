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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admindashboard" element={<Dashboard />} />
          <Route path="/adminskillsadd" element={<AdminSkillEvaluator />} />
          <Route path="/student-skill-evaluator" element={<StudentSkillEvaluator />} />
          {/* Updated to include dynamic parameter */}
          <Route path="/exam/:domain" element={<ExamPage />} />
          <Route path="/path-finder" element={<CareerRoadmap />} />
          <Route path="/job-matcher" element={<JobRoleRecommendation />} />
          <Route path="/quick-revision" element={<QuickRevision />} />
          <Route path="/adminjobadd" element={<AdminCreateOpportunity />} />
          <Route path="/find-opportunity" element={<Opportunities />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

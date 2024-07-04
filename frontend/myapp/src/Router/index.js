import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from '../views/SplashScreen';
import Answer from '../views/Answer';
import QuestionMain from '../views/QusetionMain';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/question/:id" element={<QuestionMain />} />
        <Route path="/answer" element={<Answer />} />

        {/* <Route path="/home" element={<Home />} /> */}
        {/* 다른 라우트를 추가할 수 있습니다. */}
      </Routes>
    </Router>
  );
};

export default AppRouter;

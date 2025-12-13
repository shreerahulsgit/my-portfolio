import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import TargetCursor from './lib/components/target-cursor.jsx';
import NavigationBar from './lib/components/navigation-bar.jsx';

const HomePage = lazy(() => import('./routes/home-page.jsx'));
const AboutPage = lazy(() => import('./routes/about-page.jsx'));
const ProjectsPage = lazy(() => import('./routes/myproject/project.jsx'));

const BeyondEntry = lazy(() => import('./routes/beyond/beyond-entry.jsx'));
const BeyondMain = lazy(() => import('./routes/beyond/beyond-main.jsx'));
const BeyondBooks = lazy(() => import('./lib/components/beyond-books.jsx'));
const BeyondMusic = lazy(() => import('./lib/components/beyond-music.jsx'));

const ResumeEntry = lazy(() => import('./routes/resume/resume-entry.jsx'));
const ResumeMain = lazy(() => import('./routes/resume/resume-main.jsx'));

const ContactEntry = lazy(() => import('./routes/contact/contact-entry.jsx'));
const ContactMain = lazy(() => import('./routes/contact/contact-main.jsx'));

const SkillsEntry = lazy(() => import('./routes/skills/skills-entry.jsx'));
const SkillsMain = lazy(() => import('./routes/skills/skills-main.jsx'));
const CertificatePage = lazy(() => import('./routes/skills/certificate.jsx'));

const routeMap = {
    '/': 'Home',
    '/about': 'About',
    '/projects': 'Projects',
    '/beyond': 'Special',
    '/beyond/books': 'Special',
    '/beyond/music': 'Special',
    '/resume': 'Resume',
    '/resume/details': 'Resume',
    '/contact': 'Contact',
    '/contact/form': 'Contact',
    '/skills': 'Skills',
    '/skills/details': 'Skills',
    '/skills/certificates': 'Skills',
};

function Layout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPage = routeMap[location.pathname] || '';
    const showNavbar = !!currentPage;
    const showTargetCursor = location.pathname !== '/resume/details';

    return (
        <>
            {showTargetCursor && (
                <TargetCursor spinDuration={2} hideDefaultCursor={true} />
            )}
            {showNavbar && (
                <NavigationBar
                    currentPage={currentPage}
                    onHomeClick={() => navigate('/')}
                    onAboutClick={() => navigate('/about')}
                    onProjectsClick={() => navigate('/projects')}
                    onSpecialClick={() => navigate('/beyond')}
                    onResumeClick={() => navigate('/resume')}
                    onContactClick={() => navigate('/contact')}
                    onSkillsClick={() => navigate('/skills')}
                />
            )}
            {children}
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Suspense fallback={null}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />

                        <Route path="/about" element={<AboutPage />} />
                        <Route
                            path="/about/*"
                            element={<Navigate to="/about" replace />}
                        />

                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route
                            path="/projects/*"
                            element={<Navigate to="/projects" replace />}
                        />

                        <Route path="/beyond" element={<BeyondEntry />} />
                        <Route
                            path="/beyond/overview"
                            element={<BeyondMain />}
                        />
                        <Route path="/beyond/books" element={<BeyondBooks />} />
                        <Route path="/beyond/music" element={<BeyondMusic />} />
                        <Route
                            path="/beyond/*"
                            element={<Navigate to="/beyond/overview" replace />}
                        />

                        <Route path="/resume" element={<ResumeEntry />} />
                        <Route
                            path="/resume/details"
                            element={<ResumeMain />}
                        />
                        <Route
                            path="/resume/*"
                            element={<Navigate to="/resume/details" replace />}
                        />

                        <Route path="/contact" element={<ContactEntry />} />
                        <Route path="/contact/form" element={<ContactMain />} />
                        <Route
                            path="/contact/*"
                            element={<Navigate to="/contact/form" replace />}
                        />

                        <Route path="/skills" element={<SkillsEntry />} />
                        <Route
                            path="/skills/details"
                            element={<SkillsMain />}
                        />
                        <Route
                            path="/skills/certificates"
                            element={<CertificatePage />}
                        />
                        <Route
                            path="/skills/*"
                            element={<Navigate to="/skills/details" replace />}
                        />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </Layout>
        </BrowserRouter>
    );
}

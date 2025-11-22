"use client";
import React, { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Clock, BookOpen, Brain, Code, CheckCircle, Target, Zap, ChevronRight, User, Menu, X } from 'lucide-react';

// --- Firebase Imports and Setup (MANDATORY for stateful apps) ---
// Note: These imports are required for a runnable React file that uses Firestore.
// The actual initialization logic will run inside the useEffect.
import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

type Mastery = {
  overallScore: number;
  topicsMastered: number;
  hoursThisWeek: number;
};

type Course = {
  id: number;
  name: string;
  progress: number;
  due: string;
  focus: string;
};

type TaskType = 'assignment' | 'assessment' | 'video' | 'coding' | 'task';
type Urgency = 'high' | 'medium' | 'low';

type Task = {
  id: number;
  title: string;
  courseId: number;
  type: TaskType;
  date: string;
  urgency: Urgency;
};

type StatCardProps = {
  icon: LucideIcon;
  title: string;
  value: string | number;
  color: string;
};

type ProgressBarProps = {
  progress: number;
};

type TaskItemProps = {
  task: Task;
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

type NavLink = {
  name: string;
  icon: LucideIcon;
  href: string;
  current: boolean;
};

// Mock data for the dashboard (would be fetched from backend services)
const mockCourses: Course[] = [
  { id: 1, name: 'CS 101: Introduction to Programming', progress: 75, due: 'Dec 15', focus: 'Data Structures' },
  { id: 2, name: 'History 205: World Civilizations', progress: 40, due: 'Dec 22', focus: 'Renaissance Art' },
  { id: 3, name: 'Math 310: Calculus III', progress: 92, due: 'Dec 8', focus: 'Vector Fields' },
];

const mockUpcomingTasks: Task[] = [
  { id: 101, title: 'Final Project Submission', courseId: 1, type: 'assignment', date: '2025-12-15', urgency: 'high' },
  { id: 102, title: 'Practice Quiz: Loops & Functions', courseId: 1, type: 'assessment', date: '2025-11-25', urgency: 'medium' },
  { id: 103, title: 'Watch: The French Revolution (Video Segment 3)', courseId: 2, type: 'video', date: '2025-11-28', urgency: 'low' },
  { id: 104, title: 'Coding Challenge: Binary Search Tree', courseId: 1, type: 'coding', date: '2025-12-05', urgency: 'high' },
];

const initialMastery: Mastery = {
  overallScore: 78,
  topicsMastered: 12,
  hoursThisWeek: 6.5,
};

// --- Helper Components ---

// Component for displaying key stats in the header
const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white p-4 rounded-xl shadow-lg flex items-center space-x-4">
    <div className={`p-3 rounded-full bg-opacity-20 ${color}`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

// Progress Bar Component
const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
            className="h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%`, background: progress >= 90 ? 'linear-gradient(to right, #10b981, #059669)' : 'linear-gradient(to right, #4f46e5, #a855f7)' }}
        ></div>
    </div>
);

// Task Item Component
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    let icon, urgencyColor, typeLabel;
    
    switch (task.type) {
        case 'assignment':
            icon = <CheckCircle className="w-5 h-5" />;
            typeLabel = 'Assignment';
            break;
        case 'assessment':
            icon = <Target className="w-5 h-5" />;
            typeLabel = 'Assessment';
            break;
        case 'video':
            icon = <BookOpen className="w-5 h-5" />;
            typeLabel = 'Video Lecture';
            break;
        case 'coding':
            icon = <Code className="w-5 h-5" />;
            typeLabel = 'Coding Challenge';
            break;
        default:
            icon = <Clock className="w-5 h-5" />;
            typeLabel = 'Task';
    }

    switch (task.urgency) {
        case 'high':
            urgencyColor = 'text-red-600 bg-red-100';
            break;
        case 'medium':
            urgencyColor = 'text-yellow-600 bg-yellow-100';
            break;
        case 'low':
            urgencyColor = 'text-green-600 bg-green-100';
            break;
        default:
            urgencyColor = 'text-gray-600 bg-gray-100';
    }

    const course = mockCourses.find(c => c.id === task.courseId);

    return (
        <a href="#" className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 border border-gray-100">
            <div className="flex items-center space-x-4">
                <div className="text-indigo-500">{icon}</div>
                <div>
                    <p className="font-semibold text-gray-800">{task.title}</p>
                    <p className="text-xs text-gray-500">{course ? course.name : 'Unknown Course'}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${urgencyColor}`}>
                    {typeLabel}
                </span>
                <div className="text-sm font-medium text-gray-700 flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    {new Date(task.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
        </a>
    );
};

// Navigation Links Data
const navLinks: NavLink[] = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '#dashboard', current: true },
    { name: 'Course Hub', icon: BookOpen, href: '#courses', current: false },
    { name: 'Adaptive Planner', icon: Zap, href: '#planner', current: false },
    { name: 'Assessments', icon: Target, href: '#assessments', current: false },
    { name: 'Coding Coach', icon: Code, href: '#coach', current: false },
];

// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Mobile overlay */}
            <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={onClose}></div>

            {/* Sidebar content */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-xl p-4 transform transition-transform duration-300 z-40 lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
                {/* Logo and Close Button (Mobile) */}
                <div className="flex justify-between items-center mb-8">
                    <div className="text-2xl font-extrabold text-indigo-600 flex items-center">
                        <Brain className="w-6 h-6 mr-2" />
                        AdeptLearn
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 lg:hidden p-2">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                    {navLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={`flex items-center p-3 rounded-lg transition duration-150 ${
                                item.current
                                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                            }`}
                            onClick={onClose} // Close sidebar on mobile when an item is clicked
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </a>
                    ))}
                </nav>

                {/* Integration Status (Bottom) */}
                <div className="absolute bottom-4 w-56 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                    <p className="font-semibold mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Integrations Active
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-1">
                        <li>Canvas Synced</li>
                        <li>YouTube Connected</li>
                        <li>Gemini 3 Ready</li>
                    </ul>
                </div>
            </div>
        </>
    );
};


const App: React.FC = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
    const [mastery, setMastery] = useState<Mastery>(initialMastery);
    const [upcomingTasks, setUpcomingTasks] = useState<Task[]>(mockUpcomingTasks);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    
    // Function to calculate mastery color
    const getMasteryColor = (score: number) => {
        if (score >= 85) return 'bg-emerald-500';
        if (score >= 70) return 'bg-amber-500';
        return 'bg-red-500';
    };

    // Firebase Initialization and Authentication
    useEffect(() => {
        let unsubscribeAuth: (() => void) | undefined;

        const initFirebase = async () => {
            try {
                // Global variables provided by the Canvas environment
                const appId =
                    typeof window !== 'undefined' && typeof (window as any).__app_id === 'string'
                        ? (window as any).__app_id
                        : 'default-app-id';
                const rawFirebaseConfig =
                    typeof window !== 'undefined' ? (window as any).__firebase_config : undefined;
                const firebaseConfig: FirebaseOptions = rawFirebaseConfig
                    ? (JSON.parse(rawFirebaseConfig) as FirebaseOptions)
                    : ({} as FirebaseOptions);
                const initialAuthToken =
                    typeof window !== 'undefined' && typeof (window as any).__initial_auth_token === 'string'
                        ? (window as any).__initial_auth_token
                        : null;
                
                if (Object.keys(firebaseConfig).length === 0) {
                    console.warn("Firebase configuration missing; running in demo mode.");
                    setIsAuthReady(true);
                    return;
                }

                const app = initializeApp(firebaseConfig);
                const auth = getAuth(app);
                const db = getFirestore(app);

                // Sign in with custom token or anonymously
                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }

                // Set up Auth State Listener
                unsubscribeAuth = onAuthStateChanged(auth, (user) => {
                    if (user) {
                        setUserId(user.uid);
                        // Start listening to the user's data (e.g., mastery stats)
                        const userDocPath = `/artifacts/${appId}/users/${user.uid}/stats/mastery`;
                        const userDocRef = doc(db, userDocPath);

                        // Example Firestore listener for real-time updates
                        onSnapshot(
                            userDocRef,
                            (docSnap) => {
                                if (docSnap.exists()) {
                                    const data = docSnap.data() as Partial<Mastery> | undefined;
                                    if (
                                        data &&
                                        typeof data.overallScore === 'number' &&
                                        typeof data.topicsMastered === 'number' &&
                                        typeof data.hoursThisWeek === 'number'
                                    ) {
                                        setMastery({
                                            overallScore: data.overallScore,
                                            topicsMastered: data.topicsMastered,
                                            hoursThisWeek: data.hoursThisWeek,
                                        });
                                    } else {
                                        setMastery(initialMastery);
                                    }
                                } else {
                                    // Initialize user stats if they don't exist
                                    setMastery(initialMastery);
                                }
                            },
                            (error) => {
                                console.error("Error listening to mastery stats:", error);
                            }
                        );
                        
                    } else {
                        setUserId(null);
                        setMastery(initialMastery);
                    }
                    setIsAuthReady(true);
                });

            } catch (error) {
                console.error("Firebase initialization or authentication failed:", error);
                setIsAuthReady(true);
            }
        };

        initFirebase();
        return () => {
            if (unsubscribeAuth) {
                unsubscribeAuth();
            }
        };
    }, []);

    if (!isAuthReady) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-xl">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                    <p className="mt-4 text-gray-600">Loading your adaptive dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            
            {/* Sidebar (Desktop) and Mobile Menu Overlay */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 p-4 sm:p-8">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header, Menu Button (Mobile) and User ID Display */}
                    <header className="flex justify-between items-center pb-8 border-b border-gray-200">
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="text-gray-500 p-2 lg:hidden mr-4 rounded-lg hover:bg-gray-100"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        
                        <h1 className="text-3xl font-extrabold text-indigo-700 flex items-center">
                            <LayoutDashboard className="w-8 h-8 mr-3 text-indigo-500" />
                            Student Dashboard
                        </h1>
                        
                        <div className="text-sm bg-gray-100 p-2 rounded-lg flex items-center ml-auto">
                             <User className="w-4 h-4 mr-2 text-gray-500" />
                             <span className='font-mono text-gray-600 truncate'>
                                User ID: {userId || 'Signing in Anonymously...'}
                             </span>
                        </div>
                    </header>

                    {/* Key Metrics Section */}
                    <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard 
                            icon={Brain} 
                            title="Overall Mastery Score" 
                            value={`${mastery.overallScore}%`} 
                            color={getMasteryColor(mastery.overallScore).replace('bg', 'text')} 
                        />
                        <StatCard 
                            icon={Target} 
                            title="Topics Mastered" 
                            value={mastery.topicsMastered} 
                            color="text-purple-500 bg-purple-100" 
                        />
                        <StatCard 
                            icon={Clock} 
                            title="Study Hours (This Week)" 
                            value={`${mastery.hoursThisWeek} hrs`} 
                            color="text-indigo-500 bg-indigo-100" 
                        />
                    </section>

                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                        
                        {/* Left Column (Upcoming Tasks & Quick Access) */}
                        <div className="lg:col-span-2 space-y-10">
                            
                            {/* Upcoming Tasks Section */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <Clock className="w-6 h-6 mr-2 text-red-500" />
                                    Upcoming Deadlines & Tasks
                                </h2>
                                <div className="space-y-4">
                                    {upcomingTasks
                                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                                        .map(task => <TaskItem key={task.id} task={task} />)
                                    }
                                </div>
                            </section>

                            {/* Quick Access Section (Removed - now handled by Sidebar) */}
                            {/* <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <Zap className="w-6 h-6 mr-2 text-yellow-500" />
                                    Quick Launch
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg border-b-4 border-indigo-500 hover:bg-indigo-50 transition duration-200">
                                        <BookOpen className="w-8 h-8 text-indigo-600 mb-2" />
                                        <span className="text-sm font-semibold">Course Hub</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg border-b-4 border-purple-500 hover:bg-purple-50 transition duration-200">
                                        <Target className="w-8 h-8 text-purple-600 mb-2" />
                                        <span className="text-sm font-semibold">Assessments</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg border-b-4 border-pink-500 hover:bg-pink-50 transition duration-200">
                                        <Code className="w-8 h-8 text-pink-600 mb-2" />
                                        <span className="text-sm font-semibold">Coding Coach</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg border-b-4 border-emerald-500 hover:bg-emerald-50 transition duration-200">
                                        <LayoutDashboard className="w-8 h-8 text-emerald-600 mb-2" />
                                        <span className="text-sm font-semibold">Adaptive Planner</span>
                                    </button>
                                </div>
                            </section> */}
                        </div>
                        
                        {/* Right Column (Course Progress) */}
                        <div className="lg:col-span-1">
                            <section className="bg-white p-6 rounded-xl shadow-xl sticky top-4">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    Course Progress
                                </h2>
                                <div className="space-y-6">
                                    {mockCourses.map(course => (
                                        <div key={course.id} className="pb-4 border-b last:border-b-0">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="font-semibold text-sm text-gray-700">{course.name}</p>
                                                <span className="text-indigo-600 text-sm font-bold">{course.progress}%</span>
                                            </div>
                                            <ProgressBar progress={course.progress} />
                                            <p className="text-xs text-gray-500 mt-2">
                                                Focus Topic: <span className="font-medium text-gray-600">{course.focus}</span>
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Due: <span className="font-medium text-gray-600">{course.due}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-6 w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200">
                                    View Full Course Details
                                </button>
                            </section>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default App;

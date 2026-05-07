const { useState, useEffect } = React;

// Icons component wrapper
const Icon = ({ name, size = 20, className = "" }) => {
    const icons = {
        LayoutDashboard: lucide.LayoutDashboard,
        Target: lucide.Target,
        CheckSquare: lucide.CheckSquare,
        Wallet: lucide.Wallet,
        TrendingUp: lucide.TrendingUp,
        Zap: lucide.Zap,
        FileText: lucide.FileText,
        BarChart3: lucide.BarChart3,
        Search: lucide.Search,
        Bell: lucide.Bell,
        ChevronRight: lucide.ChevronRight,
        ExternalLink: lucide.ExternalLink,
        Flame: lucide.Flame,
        Clock: lucide.Clock,
        Filter: lucide.Filter,
        MoreHorizontal: lucide.MoreHorizontal,
        ArrowUpRight: lucide.ArrowUpRight,
        Activity: lucide.Activity,
        GasPump: lucide.GasPump,
        DollarSign: lucide.DollarSign,
        Award: lucide.Award,
        Plus: lucide.Plus
    };
    const IconComponent = icons[name] || lucide.Circle;
    return <IconComponent size={size} className={className} />;
};

// Mock Data
const kpiData = [
    { label: 'Total Earned', value: '$12,450', change: '+23%', icon: 'DollarSign', positive: true },
    { label: 'Gas Spent', value: '$1,280', change: '-5%', icon: 'GasPump', positive: true },
    { label: 'ROI %', value: '872%', change: '+12%', icon: 'TrendingUp', positive: true },
    { label: 'Active Opportunities', value: '14', change: '+3', icon: 'Target', positive: true }
];

const todayTasks = [
    { id: 1, title: 'Swap on zkSync Era', protocol: 'SyncSwap', difficulty: 'Easy', reward: 'High', completed: false, link: '#' },
    { id: 2, title: 'Bridge to Base', protocol: 'Across', difficulty: 'Medium', reward: 'Medium', completed: true, link: '#' },
    { id: 3, title: 'Stake ETH on EigenLayer', protocol: 'EigenLayer', difficulty: 'Hard', reward: 'Very High', completed: false, link: '#' },
    { id: 4, title: 'Mint NFT on Scroll', protocol: 'Scroll', difficulty: 'Easy', reward: 'Low', completed: false, link: '#' },
    { id: 5, title: 'Provide LP on Arbitrum', protocol: 'Camelot', difficulty: 'Medium', reward: 'High', completed: false, link: '#' }
];

const opportunities = [
    { id: 1, name: 'LayerZero', chain: 'Multi', stage: 'Early', score: 9.2, funding: '$263M', effort: 'Medium', category: 'Bridge' },
    { id: 2, name: 'zkSync', chain: 'zkSync', stage: 'Mid', score: 8.8, funding: '$458M', effort: 'High', category: 'L2' },
    { id: 3, name: 'StarkNet', chain: 'StarkNet', stage: 'Late', score: 7.5, funding: '$282M', effort: 'Low', category: 'L2' },
    { id: 4, name: 'Base', chain: 'Base', stage: 'Early', score: 8.9, funding: 'Coinbase', effort: 'Medium', category: 'L2' },
    { id: 5, name: 'Linea', chain: 'Linea', stage: 'Early', score: 8.1, funding: '$726M', effort: 'High', category: 'L2' },
    { id: 6, name: 'Scroll', chain: 'Scroll', stage: 'Mid', score: 7.8, funding: '$80M', effort: 'Medium', category: 'L2' }
];

const wallets = [
    { id: 1, name: 'Main Farm', address: '0x71C...9A2B', balance: '$4,230', txCount: 142, gasUsed: '$340', score: 92, status: 'active' },
    { id: 2, name: 'Airdrop #2', address: '0x3F2...8C1D', balance: '$1,890', txCount: 89, gasUsed: '$180', score: 78, status: 'active' },
    { id: 3, name: 'Fresh Wallet', address: '0x9A1...4E5F', balance: '$500', txCount: 12, gasUsed: '$45', score: 45, status: 'warning' }
];

// Components
const SidebarItem = ({ icon, label, active, onClick }) => (
    <button onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active ? 'bg-[#1A2235] text-[#FFD700] border-l-2 border-[#FFD700]' : 'text-gray-400 hover:bg-[#1A2235]/50 hover:text-gray-200'}`}>
        <Icon name={icon} size={20} className={active ? 'text-[#FFD700]' : 'group-hover:text-gray-200'} />
        <span className="font-medium text-sm">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FFD700]" />}
    </button>
);

const SidebarSection = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</h3>
        <div className="space-y-1">{children}</div>
    </div>
);

const KPICard = ({ label, value, change, icon, positive }) => (
    <div className="bg-[#121826] rounded-2xl p-6 border border-[#1E293B] hover:border-[#FFD700]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/5">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-[#0B0F1A] border border-[#1E293B]">
                <Icon name={icon} size={20} className="text-[#FFD700]" />
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {change}
            </span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
        <p className="text-sm text-gray-400">{label}</p>
    </div>
);

const TaskItem = ({ task, onToggle }) => (
    <div className={`group flex items-center gap-4 p-4 rounded-xl border border-[#1E293B] hover:bg-[#1A2235]/50 transition-all duration-200 ${task.completed ? 'opacity-60' : ''}`}>
        <button onClick={() => onToggle(task.id)}
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-[#FFD700] border-[#FFD700] text-black' : 'border-gray-600 hover:border-[#FFD700]'}`}>
            {task.completed && <Icon name="CheckSquare" size={14} />}
        </button>
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <h4 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>{task.title}</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1A2235] text-gray-400 border border-[#2D3748]">{task.protocol}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Icon name="Zap" size={12} /> {task.difficulty}</span>
                <span className="flex items-center gap-1"><Icon name="Award" size={12} /> {task.reward}</span>
            </div>
        </div>
        <a href={task.link}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${task.completed ? 'bg-[#1A2235] text-gray-500 cursor-default' : 'bg-[#FFD700] text-black hover:bg-[#E6C200]'}`}
            onClick={(e) => task.completed && e.preventDefault()}>
            {task.completed ? 'Done' : 'Go'}
            {!task.completed && <Icon name="ExternalLink" size={14} />}
        </a>
    </div>
);

const OpportunityCard = ({ opp }) => (
    <div className="bg-[#121826] rounded-2xl p-6 border border-[#1E293B] hover:border-[#FFD700]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 group cursor-pointer">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 border border-[#FFD700]/20 flex items-center justify-center text-[#FFD700] font-bold text-lg">
                    {opp.name[0]}
                </div>
                <div>
                    <h3 className="font-bold text-gray-100 group-hover:text-[#FFD700] transition-colors">{opp.name}</h3>
                    <span className="text-xs text-gray-500">{opp.chain}</span>
                </div>
            </div>
            <div className={`px-2 py-1 rounded-lg text-xs font-bold ${opp.stage === 'Early' ? 'bg-emerald-500/10 text-emerald-400' : opp.stage === 'Mid' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                {opp.stage}
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#0B0F1A] rounded-lg p-3 border border-[#1E293B]">
                <p className="text-xs text-gray-500 mb-1">Score</p>
                <p className="text-lg font-bold text-[#FFD700]">{opp.score}</p>
            </div>
            <div className="bg-[#0B0F1A] rounded-lg p-3 border border-[#1E293B]">
                <p className="text-xs text-gray-500 mb-1">Funding</p>
                <p className="text-sm font-semibold text-gray-200">{opp.funding}</p>
            </div>
        </div>
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-400">
                <Icon name="Activity" size={14} />
                <span>Effort: {opp.effort}</span>
            </div>
            <span className="text-xs text-gray-500">{opp.category}</span>
        </div>
        <button className="w-full py-2.5 rounded-xl bg-[#1A2235] text-gray-300 text-sm font-semibold hover:bg-[#FFD700] hover:text-black transition-all duration-200 border border-[#2D3748] hover:border-[#FFD700]">
            View Details
        </button>
    </div>
);

const WalletRow = ({ wallet, selected, onClick }) => (
    <div onClick={() => onClick(wallet)}
        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${selected ? 'border-[#FFD700] bg-[#FFD700]/5' : 'border-[#1E293B] hover:bg-[#1A2235]/50'}`}>
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${wallet.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <h4 className="font-semibold text-gray-100">{wallet.name}</h4>
            </div>
            <span className="text-xs text-gray-500 font-mono">{wallet.address}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{wallet.balance}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${wallet.score >= 80 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                Score: {wallet.score}
            </span>
        </div>
    </div>
);

const EarningsChart = () => {
    const data = [30, 45, 35, 50, 48, 60, 55, 70, 65, 80, 75, 90];
    const max = Math.max(...data);
    const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / max) * 100}`).join(' ');
    
    return (
        <div className="h-64 w-full relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <polygon points={`0,100 ${points} 100,100`} fill="url(#gradient)" />
                <polyline points={points} fill="none" stroke="#FFD700" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                {data.map((d, i) => (
                    <circle key={i} cx={(i / (data.length - 1)) * 100} cy={100 - (d / max) * 100} r="1" fill="#FFD700" />
                ))}
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-2">
                <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
            </div>
        </div>
    );
};

const GasProfitChart = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const profit = [1200, 1900, 1500, 2200, 2800, 3200];
    const gas = [400, 350, 500, 450, 600, 550];
    const max = 3500;

    return (
        <div className="h-64 w-full relative flex items-end justify-between px-2 gap-4">
            {months.map((month, i) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-1 h-48 items-end">
                        <div className="flex-1 bg-[#FFD700] rounded-t-lg opacity-90" style={{ height: `${(profit[i] / max) * 100}%` }} />
                        <div className="flex-1 bg-gray-700 rounded-t-lg opacity-70" style={{ height: `${(gas[i] / max) * 100}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{month}</span>
                </div>
            ))}
        </div>
    );
};

// Main App
function App() {
    const [activePage, setActivePage] = useState('dashboard');
    const [tasks, setTasks] = useState(todayTasks);
    const [selectedWallet, setSelectedWallet] = useState(wallets[0]);
    const [taskFilter, setTaskFilter] = useState('all');

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const progress = (completedCount / tasks.length) * 100;

    const renderDashboard = () => (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map((kpi, idx) => <KPICard key={idx} {...kpi} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Icon name="Flame" className="text-[#FFD700]" size={24} />
                                Today's Actions
                            </h2>
                            <p className="text-sm text-gray-400 mt-1">Complete tasks to maximize your airdrop eligibility</p>
                        </div>
                        <div className="flex items-center gap-2 bg-[#121826] rounded-xl px-4 py-2 border border-[#1E293B]">
                            <span className="text-sm text-gray-400">{completedCount}/{tasks.length}</span>
                            <div className="w-24 h-2 bg-[#0B0F1A] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] transition-all duration-500" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {tasks.map(task => <TaskItem key={task.id} task={task} onToggle={toggleTask} />)}
                    </div>

                    <div className="bg-[#121826] rounded-2xl p-6 border border-[#1E293B] mt-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-100">Weekly Progress</h3>
                            <span className="text-xs text-gray-500">Streak: 5 days 🔥</span>
                        </div>
                        <div className="flex justify-between items-end h-32 gap-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                                const heights = [60, 80, 45, 90, 70, 30, 85];
                                const isToday = i === 4;
                                return (
                                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                                        <div className="w-full relative">
                                            <div className={`w-full rounded-t-lg transition-all duration-300 ${isToday ? 'bg-[#FFD700]' : 'bg-[#1A2235]'}`} style={{ height: `${heights[i]}px` }} />
                                            {isToday && <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />}
                                        </div>
                                        <span className={`text-xs ${isToday ? 'text-[#FFD700] font-semibold' : 'text-gray-500'}`}>{day}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#121826] rounded-2xl p-6 border border-[#1E293B]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-100">Active Opportunities</h3>
                            <button onClick={() => setActivePage('opportunities')} className="text-xs text-[#FFD700] hover:underline">View All</button>
                        </div>
                        <div className="space-y-3">
                            {opportunities.slice(0, 4).map(opp => (
                                <div key={opp.id} className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F1A] border border-[#1E293B] hover:border-[#FFD700]/30 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#1A2235] flex items-center justify-center text-[#FFD700] font-bold text-sm">{opp.name[0]}</div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-200">{opp.name}</p>
                                            <p className="text-xs text-gray-500">{opp.stage}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-[#FFD700]">{opp.score}</p>
                                        <p className="text-xs text-gray-500">Score</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#121826] rounded-2xl p-6 border border-[#1E293B]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-100">Wallet Activity</h3>
                            <span className="text-xs text-emerald-400 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                            </span>
                        </div>
                        <div className="space-y-3">
                            {wallets.map(wallet => (
                                <div key={wallet.id} className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F1A] border border-[#1E293B]">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-200">{wallet.name}</p>
                                        <p className="text-xs text-gray-500">{wallet.txCount} transactions</p>
                                    </div>
                                    <div className={`text-sm font-bold ${wallet.score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{wallet.score}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderOpportunities = () => (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Opportunities</h2>
                    <p className="text-gray-400 mt-1">Track and farm the most promising airdrops</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input type="text" placeholder="Search projects..." className="pl-10 pr-4 py-2.5 bg-[#121826] border border-[#1E293B] rounded-xl text-sm text-gray-200 focus:outline-none focus:border-[#FFD700]/50 w-64" />
                    </div>
                    <select className="px-4 py-2.5 bg-[#121826] border border-[#1E293B] rounded-xl text-sm text-gray-200 focus:outline-none focus:border-[#FFD700]/50">
                        <option>All Chains</option><option>Ethereum</option><option>zkSync</option><option>Base</option>
                    </select>
                    <select className="px-4 py-2.5 bg-[#121826] border border-[#1E293B] rounded-xl text-sm text-gray-200 focus:outline-none focus:border-[#FFD700]/50">
                        <option>All Stages</option><option>Early</option><option>Mid</option><option>Late</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunities.map(opp => <OpportunityCard key={opp.id} opp={opp} />)}
            </div>
        </div>
    );

    const renderTasks = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Tasks</h2>
                    <p className="text-gray-400 mt-1">Manage your farming activities</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FFD700] text-black rounded-xl text-sm font-semibold hover:bg-[#E6C200] transition-colors">
                    <Icon name="Plus" size={16} /> Add Task
                </button>
            </div>
            <div className="flex gap-2 border-b border-[#1E293B] pb-1">
                {['all', 'daily', 'weekly'].map(tab => (
                    <button key={tab} onClick={() => setTaskFilter(tab)}
                        className={`px-4 py-2 text-sm font-medium capitalize rounded-t-lg transition-colors ${taskFilter === tab ? 'text-[#FFD700] border-b-2 border-[#FFD700]' : 'text-gray-500 hover:text-gray-300'}`}>
                        {tab}
                    </button>
                ))}
            </div>
            <div className="bg-[#121826] rounded-2xl border border-[#1E293B] overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#1E293B] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-1">Status</div>
                    <div className="col-span-5">Task</div>
                    <div className="col-span-2">Wallet</div>
                    <div className="col-span-2">Due Date</div>
                    <div className="col-span-2">Actions</div>
                </div>
                <div className="divide-y divide-[#1E293B]">
                    {tasks.map(task => (
                        <div key={task.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1A2235]/30 transition-colors">
                            <div className="col-span-1">
                                <button onClick={() => toggleTask(task.id)} className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${task.completed ? 'bg-[#FFD700] border-[#FFD700] text-black' : 'border-gray-600'}`}>
                                    {task.completed && <Icon name="CheckSquare" size={12} />}
                                </button>
                            </div>
                            <div className="col-span-5">
                                <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>{task.title}</p>
                                <p className="text-xs text-gray-500">{task.protocol}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-xs px-2 py-1 rounded-full bg-[#1A2235] text-gray-400 border border-[#2D3748]">Main Farm</span>
                            </div>
                            <div className="col-span-2 flex items-center gap-2 text-sm text-gray-400">
                                <Icon name="Clock" size={14} /> Today
                            </div>
                            <div className="col-span-2">
                                <button className="text-[#FFD700] hover:text-[#E6C200] text-sm font-medium flex items-center gap-1">
                                    Details <Icon name="ChevronRight" size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderWallets = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Wallets</h2>
                    <p className="text-gray-400 mt-1">Monitor your farming wallets</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FFD700] text-black rounded-xl text-sm font-semibold hover:bg-[#E6C200] transition-colors">
                    <Icon name="Plus" size={16} /> Add Wallet
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-3">
                    {wallets.map(wallet => <WalletRow key={wallet.id} wallet={wallet} selected={selectedWallet?.id === wallet.id} onClick={setSelectedWallet} />)}
                </div>
                <div className="lg:col-span-2 space-y-6">
                    {selectedWallet && (
                        <>
                            <div className="bg-[#121826] rounded-2xl p-6 border border-[#1E293B]">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 border border-[#FFD700]/20 flex items-center justify-center">
                                            <Icon name="Wallet" size={28} className="text-[#FFD700]" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{selectedWallet.name}</h3>
                                            <p className="text-sm text-gray-500 font-mono">{selectedWallet.address}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-[#FFD700]">{selectedWallet.balance}</p>
                                        <p className="text-sm text-gray-500">Total Balance</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-[#0B0F1A] rounded-xl p-4 border border-[#1E293B]">
                                        <p className="text-xs text-gray-500 mb-1">Transactions</p>
                                        <p className="text-xl font-bold text-white">{selectedWallet.txCount}</p>
                                    </div>
                                    <div className="bg-[#0B0F1A] rounded-xl p-4 border border-[#1E293B]">
                                        <p className="text-xs text-gray-500 mb-1">Gas Used</p>
                                        <p className="text-xl font-bold text-white">{selectedWallet.gasUsed}</p>
                                    </div>
                                    <div className="bg-[#0B0F1A] rounded-xl p-4 border border-[#1E293B]">
                                        <p className="text-xs text-gray-500 mb-1">Activity Score</p>
                                        <p className="text-xl font-bold text-[#FFD700]">{selectedWallet.score}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#121826] rounded-2xl p-6 border border-[#1E293B]">
                                <h3 className="font-bold text-gray-100 mb-4">Recent Activity</h3>
                                <div className="space-y-3">
                                    {[
                                        { action: 'Swap ETH → USDC', protocol: 'SyncSwap', time: '2 min ago', value: '-$1,200' },
                                        { action: 'Bridge to Base', protocol: 'Across', time: '1 hr ago', value: '-$45' },
                                        { action: 'Claim Rewards', protocol: 'EigenLayer', time: '3 hr ago', value: '+$320' },
                                    ].map((tx, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F1A] border border-[#1E293B]">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.value.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                                    <Icon name="ArrowUpRight" size={16} className={tx.value.startsWith('+') ? '' : 'rotate-90'} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-200">{tx.action}</p>
                                                    <p className="text-xs text-gray-500">{tx.protocol}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-sm font-semibold ${tx.value.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{tx.value}</p>
                                                <p className="text-xs text-gray-500">{tx.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white">Analytics</h2>
                <p className="text-gray-400 mt-1">Track your farming performance</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#121826] rounded-2xl p-6 border border-[#1E293B]">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-gray-100">Earnings Over Time</h3>
                            <p className="text-sm text-gray-500">Cumulative airdrop value</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#FFD700]" />
                            <span className="text-xs text-gray-400">Profit</span>
                        </div>
                    </div>
                    <EarningsChart />
                </div>
                <div className="bg-[#121826] rounded-2xl p-6 border border-[#1E293B]">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-gray-100">Gas vs Profit</h3>
                            <p className="text-sm text-gray-500">Monthly comparison</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#FFD700]" /><span className="text-xs text-gray-400">Profit</span></div>
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-700" /><span className="text-xs text-gray-400">Gas</span></div>
                        </div>
                    </div>
                    <GasProfitChart />
                </div>
            </div>
            <div className="bg-[#121826] rounded-2xl p-6 border border-[#1E293B]">
                <h3 className="font-bold text-gray-100 mb-6">Wallet Comparison</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#1E293B] text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="pb-3 pl-4">Wallet</th>
                                <th className="pb-3">Balance</th>
                                <th className="pb-3">Transactions</th>
                                <th className="pb-3">Gas Used</th>
                                <th className="pb-3">Score</th>
                                <th className="pb-3">Efficiency</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]">
                            {wallets.map(wallet => (
                                <tr key={wallet.id} className="hover:bg-[#1A2235]/30 transition-colors">
                                    <td className="py-4 pl-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${wallet.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                            <div>
                                                <p className="text-sm font-medium text-gray-200">{wallet.name}</p>
                                                <p className="text-xs text-gray-500">{wallet.address}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 text-sm text-gray-300">{wallet.balance}</td>
                                    <td className="py-4 text-sm text-gray-300">{wallet.txCount}</td>
                                    <td className="py-4 text-sm text-gray-300">{wallet.gasUsed}</td>
                                    <td className="py-4"><span className={`text-sm font-bold ${wallet.score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{wallet.score}</span></td>
                                    <td className="py-4">
                                        <div className="w-24 h-2 bg-[#0B0F1A] rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500]" style={{ width: `${wallet.score}%` }} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch(activePage) {
            case 'dashboard': return renderDashboard();
            case 'opportunities': return renderOpportunities();
            case 'tasks': return renderTasks();
            case 'wallets': return renderWallets();
            case 'analytics': return renderAnalytics();
            default: return renderDashboard();
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F1A] text-gray-100 font-sans antialiased">
            <aside className="fixed left-0 top-0 w-60 h-full bg-[#0F1420] border-r border-[#1E293B] z-50 flex flex-col">
                <div className="h-[72px] flex items-center px-6 border-b border-[#1E293B]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
                            <Icon name="Zap" size={20} className="text-black" />
                        </div>
                        <span className="text-lg font-bold text-white tracking-tight">Airdrop<span className="text-[#FFD700]">X</span></span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto py-6 px-3">
                    <SidebarSection title="Main">
                        <SidebarItem icon="LayoutDashboard" label="Dashboard" active={activePage === 'dashboard'} onClick={() => setActivePage('dashboard')} />
                        <SidebarItem icon="Target" label="Opportunities" active={activePage === 'opportunities'} onClick={() => setActivePage('opportunities')} />
                        <SidebarItem icon="CheckSquare" label="Tasks" active={activePage === 'tasks'} onClick={() => setActivePage('tasks')} />
                        <SidebarItem icon="Wallet" label="Wallets" active={activePage === 'wallets'} onClick={() => setActivePage('wallets')} />
                    </SidebarSection>
                    <SidebarSection title="Growth">
                        <SidebarItem icon="Flame" label="Creator Hub" active={activePage === 'creator'} onClick={() => setActivePage('creator')} />
                        <SidebarItem icon="Zap" label="Alpha" active={activePage === 'alpha'} onClick={() => setActivePage('alpha')} />
                    </SidebarSection>
                    <SidebarSection title="Finance">
                        <SidebarItem icon="BarChart3" label="Analytics" active={activePage === 'analytics'} onClick={() => setActivePage('analytics')} />
                    </SidebarSection>
                    <SidebarSection title="Tools">
                        <SidebarItem icon="TrendingUp" label="Strategy" active={activePage === 'strategy'} onClick={() => setActivePage('strategy')} />
                        <SidebarItem icon="FileText" label="Notes" active={activePage === 'notes'} onClick={() => setActivePage('notes')} />
                    </SidebarSection>
                </div>
                <div className="p-4 border-t border-[#1E293B]">
                    <div className="bg-[#1A2235] rounded-xl p-4 border border-[#2D3748]">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 border border-[#FFD700]/20" />
                            <div>
                                <p className="text-sm font-semibold text-gray-200">Pro Plan</p>
                                <p className="text-xs text-gray-500">12 days left</p>
                            </div>
                        </div>
                        <button className="w-full py-2 bg-[#FFD700] text-black rounded-lg text-xs font-bold hover:bg-[#E6C200] transition-colors">Upgrade</button>
                    </div>
                </div>
            </aside>

            <div className="ml-60 min-h-screen flex flex-col">
                <header className="h-[72px] bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-[#1E293B] sticky top-0 z-40 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-96">
                            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input type="text" placeholder="Search opportunities, tasks, wallets..." className="w-full pl-10 pr-4 py-2.5 bg-[#121826] border border-[#1E293B] rounded-xl text-sm text-gray-200 focus:outline-none focus:border-[#FFD700]/50 placeholder-gray-600 transition-colors" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2.5 text-gray-400 hover:text-gray-200 hover:bg-[#1A2235] rounded-xl transition-colors">
                            <Icon name="Bell" size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-[#FFD700] rounded-full border-2 border-[#0B0F1A]" />
                        </button>
                        <div className="h-8 w-px bg-[#1E293B]" />
                        <button className="flex items-center gap-3 px-4 py-2 bg-[#121826] border border-[#1E293B] rounded-xl hover:border-[#FFD700]/30 transition-colors">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500]" />
                            <span className="text-sm font-medium text-gray-200">0x71C...9A2B</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 p-8 max-w-[1440px] mx-auto w-full">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

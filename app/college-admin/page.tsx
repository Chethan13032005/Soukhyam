"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, UserCheck, Smile, Activity, PlusCircle, Edit, Trash2, Lightbulb } from 'lucide-react';

const collegeName = "ABC College of Engineering"; // This would likely come from a user session or API
const totalStudents = 1250;
const totalCounselors = 3;
const counselorEngagement = 75; // percentage
const avgWellnessScore = 82; // percentage

const initialCounselors = [
  { id: 1, name: "Dr. Anjali Sharma", specialization: "Stress & Anxiety", students: 25 },
  { id: 2, name: "Mr. Rohan Verma", specialization: "Career Counseling", students: 32 },
  { id: 3, name: "Ms. Priya Singh", specialization: "Relationship Issues", students: 18 },
];

const behavioralReasons = [
  { reason: 'Exam Stress', count: 45, color: '#8884d8' },
  { reason: 'Anxiety', count: 32, color: '#82ca9d' },
  { reason: 'Depression', count: 18, color: '#ffc658' },
  { reason: 'Relationship Issues', count: 25, color: '#ff8042' },
  { reason: 'Family Pressure', count: 15, color: '#0088FE' },
  { reason: 'Other', count: 10, color: '#00C49F' },
];

const engagementData = [
  { name: 'Engaged', value: counselorEngagement },
  { name: 'Not Engaged', value: 100 - counselorEngagement },
];

const wellnessData = [
  { name: 'Positive', value: avgWellnessScore },
  { name: 'Needs Attention', value: 100 - avgWellnessScore },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const aiRecommendations = [
    "Consider providing a 1-day gap between major exams to reduce student stress.",
    "Organize a workshop on time management for first-year students.",
    "Promote the AI chatbot feature to increase student engagement with wellness resources.",
]

export default function CollegeAdminDashboard() {
  const [counselors, setCounselors] = useState(initialCounselors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCounselor, setEditingCounselor] = useState<any>(null);

  const handleAddCounselor = (counselor: any) => {
    setCounselors([...counselors, { ...counselor, id: counselors.length + 1 }]);
  };

  const handleUpdateCounselor = (updatedCounselor: any) => {
    setCounselors(counselors.map(c => c.id === updatedCounselor.id ? updatedCounselor : c));
  };

  const handleDeleteCounselor = (id: number) => {
    setCounselors(counselors.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background p-8 text-foreground">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary">College Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">{collegeName}</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-shadow">
              <PlusCircle className="h-5 w-5" />
              Manage Counselors
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCounselor ? 'Edit Counselor' : 'Add Counselor'}</DialogTitle>
            </DialogHeader>
            <CounselorForm
              counselor={editingCounselor}
              onSave={(counselor) => {
                if (editingCounselor) {
                  handleUpdateCounselor(counselor);
                } else {
                  handleAddCounselor(counselor);
                }
                setEditingCounselor(null);
                setIsModalOpen(false);
              }}
              onCancel={() => {
                setEditingCounselor(null);
                setIsModalOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <Card className="bg-background/70 border-primary/20 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-background/70 border-accent/20 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Counselors</CardTitle>
            <UserCheck className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{counselors.length}</div>
            <p className="text-xs text-muted-foreground">{counselors.length - initialCounselors.length} new</p>
          </CardContent>
        </Card>
        <Card className="bg-background/70 border-secondary/20 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Counselor Engagement</CardTitle>
            <Activity className="h-6 w-6 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{counselorEngagement}%</div>
            <p className="text-xs text-muted-foreground">Active this week</p>
          </CardContent>
        </Card>
        <Card className="bg-background/70 border-destructive/20 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Wellness Score</CardTitle>
            <Smile className="h-6 w-6 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgWellnessScore}%</div>
            <p className="text-xs text-muted-foreground">-2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Card className="bg-background/70 border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary">Anonymous Student Behavioral Reasons</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={behavioralReasons} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="reason" type="category" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" barSize={30}>
                    {behavioralReasons.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          <Card className="bg-background/70 border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-accent">Counselors</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {counselors.map((counselor) => (
                    <TableRow key={counselor.id}>
                      <TableCell className="font-medium">{counselor.name}</TableCell>
                      <TableCell>{counselor.specialization}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingCounselor(counselor); setIsModalOpen(true); }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteCounselor(counselor.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="bg-background/70 border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Recommendations</CardTitle>
              <Lightbulb className="h-6 w-6 text-yellow-500" />
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    {aiRecommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                            <Lightbulb className="h-4 w-4 mr-2 mt-1 text-yellow-500 flex-shrink-0" />
                            <span>{rec}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function CounselorForm({ counselor, onSave, onCancel }: { counselor: any, onSave: (counselor: any) => void, onCancel: () => void }) {
  const [name, setName] = useState(counselor?.name || '');
  const [specialization, setSpecialization] = useState(counselor?.specialization || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...counselor, name, specialization });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="specialization" className="text-right">
            Specialization
          </Label>
          <Input id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  )
}
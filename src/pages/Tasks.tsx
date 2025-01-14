import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  LogOut,
  Star,
  Calendar as CalendarIcon,
  Bell,
  Check,
  User,
  Sun,
  Moon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Task {
  id: string;
  description: string;
  completed: boolean;
  date: Date;
  priority: boolean;
}

const Tasks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [userData, setUserData] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUserData);
    setUserData(user);

    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      description: newTask,
      completed: false,
      date: selectedDate,
      priority: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
    toast({
      title: "Task added",
      description: "New task has been added successfully",
    });
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleTaskPriority = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, priority: !task.priority } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Task has been removed successfully",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const todayTasks = tasks.filter(
    (task) => new Date(task.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{userData?.username}</h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Task Input */}
        <div className="glass-card p-6 rounded-xl bg-secondary/10 mb-8">
          <form onSubmit={handleAddTask} className="flex gap-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 bg-background"
            />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Select Date</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border"
                  />
                </div>
              </SheetContent>
            </Sheet>
            <Button type="submit" className="bg-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </form>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Today's Tasks</h3>
            <span className="text-sm text-muted-foreground">
              {todayTasks.filter((t) => t.completed).length} of{" "}
              {todayTasks.length} completed
            </span>
          </div>

          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                task.completed
                  ? "bg-primary/20"
                  : "bg-secondary/10 hover:bg-secondary/20"
              } transition-colors`}
            >
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleTaskStatus(task.id)}
                  className={task.completed ? "text-primary" : ""}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <span
                  className={`${
                    task.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {task.description}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleTaskPriority(task.id)}
                  className={task.priority ? "text-yellow-500" : ""}
                >
                  <Star className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                  className="text-destructive"
                >
                  <Plus className="w-4 h-4 rotate-45" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { Sun, Moon, Plus, Trash2, Check, User } from "lucide-react";

interface Task {
  id: string;
  description: string;
  completed: boolean;
  date: string;
}

interface UserData {
  username: string;
  email: string;
}

const Tasks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [userData, setUserData] = useState<UserData | null>(null);

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
      date: new Date().toISOString(),
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

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Task has been removed successfully",
    });
  };

  const todayTasks = tasks.filter(
    (task) =>
      new Date(task.date).toDateString() === new Date().toDateString()
  );

  const completedTasks = todayTasks.filter((task) => task.completed);
  const chartData = [
    { name: "Completed", value: completedTasks.length },
    { name: "Remaining", value: todayTasks.length - completedTasks.length },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{userData?.username}</h2>
              <p className="text-sm text-muted-foreground">{userData?.email}</p>
            </div>
          </div>
          <Switch
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            className="ml-4"
          />
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Today's Progress</h3>
            <ChartContainer config={{}} className="h-64">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="hsl(var(--primary))" />
                  <Cell fill="hsl(var(--muted))" />
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="text-center mt-4">
              <p className="text-lg">
                {completedTasks.length} of {todayTasks.length} tasks completed
              </p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="bg-secondary"
              />
              <Button type="submit">
                <Plus className="w-4 h-4" />
              </Button>
            </form>

            <div className="space-y-2">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary"
                >
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleTaskStatus(task.id)}
                    >
                      <Check
                        className={`w-4 h-4 ${
                          task.completed ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                    <span
                      className={`${
                        task.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.description}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, GripVertical, Trash2, Plus, Save } from "lucide-react";
import { toast } from "sonner";
import { Title } from "../shared/Title";

interface Step {
  id: string;
  name: string;
}

export function WorkflowBuilder() {
  const [steps, setSteps] = useState<Step[]>([
    { id: "1", name: "Appointment" },
    { id: "2", name: "Consultation" },
    { id: "3", name: "Registration" },
    { id: "4", name: "Payment" },
    { id: "5", name: "Treatment" },
  ]);
  const [newStepName, setNewStepName] = useState("");

  const addStep = () => {
    if (!newStepName.trim()) return;

    const newStep: Step = {
      id: crypto.randomUUID(),
      name: newStepName.trim(),
    };

    setSteps((prev) => [...prev, newStep]);
    setNewStepName("");
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const moveStep = (index: number, direction: "up" | "down") => {
    const newSteps = [...steps];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= steps.length) return;

    [newSteps[index], newSteps[targetIndex]] = [
      newSteps[targetIndex],
      newSteps[index],
    ];
    setSteps(newSteps);
  };

  const handleSave = async () => {
    console.log(
      "Saving Workflow:",
      steps.map((s, idx) => ({ name: s.name, order: idx })),
    );
    toast.success("Workflow is Saved!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Step (eg. Consultation)"
          value={newStepName}
          onChange={(e) => setNewStepName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addStep()}
        />
        <Button disabled={!newStepName} onClick={addStep}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <Card className="w-full">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="text-slate-400 w-5 h-5 cursor-grab" />
                  <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-slate-700">
                    {step.name}
                  </span>
                </div>

                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={index === 0}
                    onClick={() => moveStep(index, "up")}
                  >
                    <ArrowDown className="w-4 h-4 rotate-180" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={index === steps.length - 1}
                    onClick={() => moveStep(index, "down")}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeStep(step.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {index !== steps.length - 1 && (
              <ArrowDown className="my-2 text-slate-500 w-5 h-5" />
            )}
          </div>
        ))}
      </div>

      {steps.length > 0 && (
        <Button className="w-full" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" /> Save
        </Button>
      )}
    </div>
  );
}

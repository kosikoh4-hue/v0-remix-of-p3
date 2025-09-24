"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Plus, Calendar, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import type { Project } from "@/lib/db"

interface MilestoneData {
  title: string
  description: string
  deadline: string
  budget: string
}

export default function NewMilestonePage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [milestones, setMilestones] = useState<MilestoneData[]>([
    {
      title: "",
      description: "",
      deadline: "",
      budget: "",
    },
  ])

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch project")
        }
        const projectData = await response.json()
        setProject(projectData)
      } catch (error) {
        console.error("Error fetching project:", error)
        toast({
          title: "Error",
          description: "Failed to load project details.",
          variant: "destructive",
        })
        router.push("/admin/projects")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchProject()
    }
  }, [params.id, router, toast])

  const handleInputChange = (index: number, field: keyof MilestoneData, value: string) => {
    setMilestones((prev) => prev.map((milestone, i) => (i === index ? { ...milestone, [field]: value } : milestone)))
  }

  const addMilestone = () => {
    setMilestones((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        deadline: "",
        budget: "",
      },
    ])
  }

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate all milestones have required fields
      const validMilestones = milestones.filter(
        (milestone) => milestone.title.trim() && milestone.description.trim() && milestone.deadline && milestone.budget,
      )

      if (validMilestones.length === 0) {
        throw new Error("At least one complete milestone is required")
      }

      // Create all milestones
      const promises = validMilestones.map((milestone) =>
        fetch("/api/milestones", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            project_id: Number.parseInt(params.id as string),
            title: milestone.title,
            description: milestone.description,
            due_date: milestone.deadline,
            status: "pending",
            budget: milestone.budget,
          }),
        }),
      )

      const responses = await Promise.all(promises)

      // Check if all requests were successful
      const failedRequests = responses.filter((response) => !response.ok)
      if (failedRequests.length > 0) {
        throw new Error(`Failed to create ${failedRequests.length} milestone(s)`)
      }

      toast({
        title: "Milestones Created",
        description: `Successfully created ${validMilestones.length} milestone(s).`,
      })

      router.push(`/admin/projects/${params.id}`)
    } catch (error) {
      console.error("Error creating milestones:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create milestones. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10c0dd] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Project not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="pt-20">
        <div className="container mx-auto px-4 md:px-6 py-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link
              href={`/admin/projects/${params.id}`}
              className="flex items-center gap-2 text-white hover:text-[#10c0dd] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Project</span>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Project Info Card */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#10c0dd] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{project.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-lg">{project.name}</h2>
                    <p className="text-muted-foreground text-sm">Adding milestones to this project</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Milestone Creation Form */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-white text-2xl font-bold flex items-center gap-2">
                  <Plus className="w-6 h-6 text-[#10c0dd]" />
                  Create Milestones
                </CardTitle>
                <p className="text-muted-foreground">
                  Add multiple milestones to track progress for this project. All fields marked with * are required.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="space-y-4 p-4 border border-border/50 rounded-lg bg-card/30">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium">Milestone {index + 1}</h3>
                        {milestones.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMilestone(index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Milestone Title */}
                        <div className="space-y-2">
                          <Label htmlFor={`title-${index}`} className="text-white font-medium">
                            Milestone Title *
                          </Label>
                          <Input
                            id={`title-${index}`}
                            value={milestone.title}
                            onChange={(e) => handleInputChange(index, "title", e.target.value)}
                            placeholder="e.g., Project Planning Phase"
                            className="bg-card border-border text-white"
                            required
                          />
                        </div>

                        {/* Budget */}
                        <div className="space-y-2">
                          <Label htmlFor={`budget-${index}`} className="text-white font-medium">
                            Budget (USD) *
                          </Label>
                          <Input
                            id={`budget-${index}`}
                            type="number"
                            value={milestone.budget}
                            onChange={(e) => handleInputChange(index, "budget", e.target.value)}
                            placeholder="8333"
                            className="bg-card border-border text-white"
                            required
                          />
                        </div>
                      </div>

                      {/* Milestone Description */}
                      <div className="space-y-2">
                        <Label htmlFor={`description-${index}`} className="text-white font-medium">
                          Milestone Detail *
                        </Label>
                        <Textarea
                          id={`description-${index}`}
                          value={milestone.description}
                          onChange={(e) => handleInputChange(index, "description", e.target.value)}
                          placeholder="Describe what needs to be accomplished in this milestone..."
                          className="bg-card border-border text-white min-h-[100px]"
                          required
                        />
                      </div>

                      {/* Deadline */}
                      <div className="space-y-2">
                        <Label htmlFor={`deadline-${index}`} className="text-white font-medium">
                          Deadline *
                        </Label>
                        <div className="relative">
                          <Input
                            id={`deadline-${index}`}
                            type="date"
                            value={milestone.deadline}
                            onChange={(e) => handleInputChange(index, "deadline", e.target.value)}
                            className="bg-card border-border text-white"
                            required
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addMilestone}
                      className="border-[#10c0dd] text-[#10c0dd] hover:bg-[#10c0dd]/10 bg-transparent"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Milestone
                    </Button>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="border-border text-muted-foreground hover:bg-card"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#10c0dd] hover:bg-[#0ea5e9] text-white"
                    >
                      {isSubmitting
                        ? "Creating..."
                        : `Create ${milestones.length} Milestone${milestones.length > 1 ? "s" : ""}`}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

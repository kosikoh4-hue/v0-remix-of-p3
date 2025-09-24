"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function NewProjectPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    creatorUsername: "",
    granteeEmail: "", // Added grantee email field
    background: "",
    missionExpertise: "",
    campaignGoals: "",
    fundingRequested: "",
    githubRepo: "",
    websiteLinks: "",
    programType: "",
    category: "",
    status: "",
    creatorStat1Name: "",
    creatorStat1Number: "",
    creatorStat2Name: "",
    creatorStat2Number: "",
    youtubeLink: "",
    tiktokLink: "",
    twitterLink: "",
    twitchLink: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.title,
          description: formData.background,
          status: formData.status.toLowerCase(), // Using the new status field
          github_repo: formData.githubRepo,
          discord_channel: formData.creatorUsername, // Using creator username as discord channel for now
          funding_amount: Number.parseFloat(formData.fundingRequested) || 0,
          start_date: new Date().toISOString().split("T")[0],
          end_date: null, // Will be set when milestones are added
          // Additional fields can be stored in metadata or separate table
          creator_username: formData.creatorUsername,
          grantee_email: formData.granteeEmail, // Added grantee email field
          mission_expertise: formData.missionExpertise,
          campaign_goals: formData.campaignGoals,
          website_links: formData.websiteLinks,
          program_type: formData.programType,
          category: formData.category,
          creator_stat_1_name: formData.creatorStat1Name,
          creator_stat_1_number: formData.creatorStat1Number,
          creator_stat_2_name: formData.creatorStat2Name,
          creator_stat_2_number: formData.creatorStat2Number,
          youtube_link: formData.youtubeLink,
          tiktok_link: formData.tiktokLink,
          twitter_link: formData.twitterLink,
          twitch_link: formData.twitchLink,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create project")
      }

      const project = await response.json()

      toast({
        title: "Project Created",
        description: `${formData.title} has been successfully created.`,
      })

      router.push(`/admin/projects/${project.id}/milestones/new`)
    } catch (error) {
      console.error("Error creating project:", error)
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="pt-20">
        <div className="container mx-auto px-4 md:px-6 py-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/admin" className="flex items-center gap-2 text-white hover:text-[#10c0dd] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin</span>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-white text-2xl font-bold flex items-center gap-2">
                  <Plus className="w-6 h-6 text-[#10c0dd]" />
                  Create New Project
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below to create a new grant project. All fields marked with * are required.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Project Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white font-medium">
                      Project Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter project title"
                      className="bg-card border-border text-white"
                      required
                    />
                  </div>

                  {/* Creator Username */}
                  <div className="space-y-2">
                    <Label htmlFor="creatorUsername" className="text-white font-medium">
                      Creator Username (Discord) *
                    </Label>
                    <Input
                      id="creatorUsername"
                      value={formData.creatorUsername}
                      onChange={(e) => handleInputChange("creatorUsername", e.target.value)}
                      placeholder="Discord username for authentication"
                      className="bg-card border-border text-white"
                      required
                    />
                  </div>

                  {/* Grantee Email */}
                  <div className="space-y-2">
                    <Label htmlFor="granteeEmail" className="text-white font-medium">
                      Grantee Email *
                    </Label>
                    <Input
                      id="granteeEmail"
                      type="email"
                      value={formData.granteeEmail}
                      onChange={(e) => handleInputChange("granteeEmail", e.target.value)}
                      placeholder="grantee@example.com"
                      className="bg-card border-border text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-white font-medium">
                        Category *
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="bg-card border-border text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-white font-medium">
                        Status *
                      </Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                        <SelectTrigger className="bg-card border-border text-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="at-risk">At Risk</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                          <SelectItem value="canceled">Canceled</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Program Type */}
                  <div className="space-y-2">
                    <Label htmlFor="programType" className="text-white font-medium">
                      Program Type *
                    </Label>
                    <Select
                      value={formData.programType}
                      onValueChange={(value) => handleInputChange("programType", value)}
                    >
                      <SelectTrigger className="bg-card border-border text-white">
                        <SelectValue placeholder="Select program type" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="milestone">Milestone-based Program</SelectItem>
                        <SelectItem value="program">Program with Sub-projects</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Milestone-based programs track progress through milestones. Programs with sub-projects contain
                      multiple projects instead of milestones.
                    </p>
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <Label htmlFor="fundingRequested" className="text-white font-medium">
                      Budget *
                    </Label>
                    <Input
                      id="fundingRequested"
                      type="number"
                      value={formData.fundingRequested}
                      onChange={(e) => handleInputChange("fundingRequested", e.target.value)}
                      placeholder="25000"
                      className="bg-card border-border text-white"
                      required
                    />
                  </div>

                  {/* Background */}
                  <div className="space-y-2">
                    <Label htmlFor="background" className="text-white font-medium">
                      Project Background *
                    </Label>
                    <Textarea
                      id="background"
                      value={formData.background}
                      onChange={(e) => handleInputChange("background", e.target.value)}
                      placeholder="Describe the project background and context..."
                      className="bg-card border-border text-white min-h-[100px]"
                      maxLength={200}
                      required
                    />
                    <p className="text-xs text-muted-foreground text-right">{formData.background.length}/200</p>
                  </div>

                  {/* Mission & Expertise */}
                  <div className="space-y-2">
                    <Label htmlFor="missionExpertise" className="text-white font-medium">
                      Mission & Expertise *
                    </Label>
                    <Textarea
                      id="missionExpertise"
                      value={formData.missionExpertise}
                      onChange={(e) => handleInputChange("missionExpertise", e.target.value)}
                      placeholder="Describe the mission and team expertise..."
                      className="bg-card border-border text-white min-h-[100px]"
                      maxLength={200}
                      required
                    />
                    <p className="text-xs text-muted-foreground text-right">{formData.missionExpertise.length}/200</p>
                  </div>

                  {/* Campaign Goals */}
                  <div className="space-y-2">
                    <Label htmlFor="campaignGoals" className="text-white font-medium">
                      Campaign Goals *
                    </Label>
                    <Textarea
                      id="campaignGoals"
                      value={formData.campaignGoals}
                      onChange={(e) => handleInputChange("campaignGoals", e.target.value)}
                      placeholder="Describe the campaign goals and expected outcomes..."
                      className="bg-card border-border text-white min-h-[100px]"
                      maxLength={200}
                      required
                    />
                    <p className="text-xs text-muted-foreground text-right">{formData.campaignGoals.length}/200</p>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-white font-medium text-lg">Creator Statistics (Optional)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Creator Stat 1 */}
                      <div className="space-y-2">
                        <Label htmlFor="creatorStat1Name" className="text-white font-medium">
                          Statistic 1 Name
                        </Label>
                        <Input
                          id="creatorStat1Name"
                          value={formData.creatorStat1Name}
                          onChange={(e) => handleInputChange("creatorStat1Name", e.target.value)}
                          placeholder="e.g., GitHub Stars, Followers, etc."
                          className="bg-card border-border text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="creatorStat1Number" className="text-white font-medium">
                          Statistic 1 Number
                        </Label>
                        <Input
                          id="creatorStat1Number"
                          type="number"
                          value={formData.creatorStat1Number}
                          onChange={(e) => handleInputChange("creatorStat1Number", e.target.value)}
                          placeholder="1000"
                          className="bg-card border-border text-white"
                        />
                      </div>

                      {/* Creator Stat 2 */}
                      <div className="space-y-2">
                        <Label htmlFor="creatorStat2Name" className="text-white font-medium">
                          Statistic 2 Name
                        </Label>
                        <Input
                          id="creatorStat2Name"
                          value={formData.creatorStat2Name}
                          onChange={(e) => handleInputChange("creatorStat2Name", e.target.value)}
                          placeholder="e.g., Years Experience, Projects, etc."
                          className="bg-card border-border text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="creatorStat2Number" className="text-white font-medium">
                          Statistic 2 Number
                        </Label>
                        <Input
                          id="creatorStat2Number"
                          type="number"
                          value={formData.creatorStat2Number}
                          onChange={(e) => handleInputChange("creatorStat2Number", e.target.value)}
                          placeholder="5"
                          className="bg-card border-border text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* GitHub Repo Link */}
                  <div className="space-y-2">
                    <Label htmlFor="githubRepo" className="text-white font-medium">
                      GitHub Repository Link
                    </Label>
                    <Input
                      id="githubRepo"
                      type="url"
                      value={formData.githubRepo}
                      onChange={(e) => handleInputChange("githubRepo", e.target.value)}
                      placeholder="https://github.com/username/repository"
                      className="bg-card border-border text-white"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-white font-medium text-lg">Platform Links (Optional)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* YouTube */}
                      <div className="space-y-2">
                        <Label htmlFor="youtubeLink" className="text-white font-medium">
                          YouTube
                        </Label>
                        <Input
                          id="youtubeLink"
                          type="url"
                          value={formData.youtubeLink}
                          onChange={(e) => handleInputChange("youtubeLink", e.target.value)}
                          placeholder="https://youtube.com/@username"
                          className="bg-card border-border text-white"
                        />
                      </div>

                      {/* TikTok */}
                      <div className="space-y-2">
                        <Label htmlFor="tiktokLink" className="text-white font-medium">
                          TikTok
                        </Label>
                        <Input
                          id="tiktokLink"
                          type="url"
                          value={formData.tiktokLink}
                          onChange={(e) => handleInputChange("tiktokLink", e.target.value)}
                          placeholder="https://tiktok.com/@username"
                          className="bg-card border-border text-white"
                        />
                      </div>

                      {/* X/Twitter */}
                      <div className="space-y-2">
                        <Label htmlFor="twitterLink" className="text-white font-medium">
                          X/Twitter
                        </Label>
                        <Input
                          id="twitterLink"
                          type="url"
                          value={formData.twitterLink}
                          onChange={(e) => handleInputChange("twitterLink", e.target.value)}
                          placeholder="https://x.com/username"
                          className="bg-card border-border text-white"
                        />
                      </div>

                      {/* Twitch */}
                      <div className="space-y-2">
                        <Label htmlFor="twitchLink" className="text-white font-medium">
                          Twitch
                        </Label>
                        <Input
                          id="twitchLink"
                          type="url"
                          value={formData.twitchLink}
                          onChange={(e) => handleInputChange("twitchLink", e.target.value)}
                          placeholder="https://twitch.tv/username"
                          className="bg-card border-border text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Website / Platform Links */}
                  <div className="space-y-2">
                    <Label htmlFor="websiteLinks" className="text-white font-medium">
                      Website / Platform Links
                    </Label>
                    <Textarea
                      id="websiteLinks"
                      value={formData.websiteLinks}
                      onChange={(e) => handleInputChange("websiteLinks", e.target.value)}
                      placeholder="Enter website URLs, social media links, etc. (one per line)"
                      className="bg-card border-border text-white min-h-[80px]"
                    />
                    <p className="text-sm text-muted-foreground">
                      Optional: Add website, social media, or other platform links (one per line)
                    </p>
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
                      {isSubmitting ? "Creating..." : "Create Project"}
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

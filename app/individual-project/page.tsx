"use client"
import { useState } from "react"
import { Check, ChevronLeft, ChevronRight, FileText, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import MilestoneDetailsPopup from "@/components/milestone-details-popup" // Import the MilestoneDetailsPopup component

function OtherProgramsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const programs = [
    {
      title: "Core Systems",
      description: "Infrastructure development and system architecture projects",
      status: "Active",
      statusColor: "bg-green-900 text-green-100",
      budget: "$750K",
    },
    {
      title: "Research Initiative",
      description: "Advanced research and development projects",
      status: "Planning",
      statusColor: "bg-blue-900 text-blue-100",
      budget: "$500K",
    },
    {
      title: "Community Outreach",
      description: "Community engagement and educational programs",
      status: "Planning",
      statusColor: "bg-yellow-900 text-yellow-100",
      budget: "$100K",
    },
    {
      title: "Innovation Labs",
      description: "Experimental technology and prototype development",
      status: "Active",
      statusColor: "bg-green-900 text-green-100",
      budget: "$300K",
    },
    {
      title: "Developer Tools",
      description: "Building tools and frameworks for developers",
      status: "Review",
      statusColor: "bg-purple-900 text-purple-100",
      budget: "$200K",
    },
    {
      title: "Security Audit",
      description: "Comprehensive security reviews and auditing",
      status: "Active",
      statusColor: "bg-green-900 text-green-100",
      budget: "$150K",
    },
  ]

  const itemsPerPage = typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3
  const maxIndex = Math.max(0, programs.length - itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const visiblePrograms = programs.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visiblePrograms.map((program, index) => (
          <Card
            key={currentIndex + index}
            className="bg-background/80 backdrop-blur-sm border-border/50 h-auto min-h-[140px]"
            style={{ borderRadius: "var(--wui-border-radius-s)" }}
          >
            <CardContent className="p-4 h-full flex flex-col">
              <h3
                className="font-semibold text-white mb-2 break-words"
                style={{
                  fontFamily: "var(--font-sf-rounded)",
                  letterSpacing: "0.0025em",
                  lineHeight: "145%",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {program.title}
              </h3>
              <p
                className="text-sm text-muted-foreground mb-3 flex-1 break-words"
                style={{
                  fontFamily: "var(--font-sf-rounded)",
                  lineHeight: "150%",
                  letterSpacing: "0.0015em",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {program.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <Badge className={program.statusColor} style={{ borderRadius: "var(--wui-border-radius-xs)" }}>
                  {program.status}
                </Badge>
                <span
                  className="text-sm font-semibold text-white break-words"
                  style={{
                    fontFamily: "var(--font-sf-rounded)",
                    wordWrap: "break-word",
                  }}
                >
                  {program.budget}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation buttons */}
      {programs.length > itemsPerPage && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="border-border text-muted-foreground hover:bg-card bg-transparent disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="border-border text-muted-foreground hover:bg-card bg-transparent disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Dots indicator */}
      {programs.length > itemsPerPage && (
        <div className="flex justify-center gap-1 mt-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === index ? "bg-white" : "bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function IndividualProjectPage() {
  const [isReviewsOpen, setIsReviewsOpen] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState(0)
  const [isMissionOpen, setIsMissionOpen] = useState(false)
  const [isCampaignGoalsOpen, setIsCampaignGoalsOpen] = useState(false)
  const [isReviewPayoutOpen, setIsReviewPayoutOpen] = useState(false)
  const [milestonePopup, setMilestonePopup] = useState<{
    isOpen: boolean
    milestone: any
  }>({
    isOpen: false,
    milestone: null,
  })

  const milestones = [
    {
      id: 1,
      title: "Project Planning", // Updated title from "Content Strategy"
      description: "Initial project setup and planning phase", // Updated description
      status: "complete" as const,
      budget: "$8,333 USD",
      dueDate: "June 15, 2024",
      completionDate: "June 12, 2024",
      assignee: "Development Team", // Updated assignee
      deliverables: ["Project roadmap", "Technical specifications", "Resource allocation", "Timeline planning"], // Updated deliverables
      notes: "Successfully completed ahead of schedule with positive stakeholder feedback.",
    },
    {
      id: 2,
      title: "Development Phase", // Updated title from "Community Engagement"
      description: "Core development and implementation", // Updated description
      status: "complete" as const,
      budget: "$8,333 USD",
      dueDate: "July 30, 2024",
      completionDate: "July 28, 2024",
      assignee: "Development Team", // Updated assignee
      deliverables: [
        "Core functionality implemented", // Updated deliverables
        "Testing framework established",
        "Documentation completed",
        "Quality assurance passed",
      ],
      notes: "Excellent progress with faster than expected completion.",
    },
    {
      id: 3,
      title: "Final Implementation",
      description: "Final phase implementation and testing",
      status: "overdue" as const,
      budget: "$8,334 USD",
      dueDate: "August 1, 2025",
      progress: 45,
      assignee: "Development Team",
      deliverables: [
        "System integration testing",
        "Performance optimization",
        "User acceptance testing",
        "Final deployment preparation",
      ],
      notes:
        "Integration testing in progress. Performance optimization complete but final testing taking longer than expected.",
    },
  ]

  const handleMilestoneClick = (milestoneId: number) => {
    const milestone = milestones.find((m) => m.id === milestoneId)
    if (milestone) {
      setMilestonePopup({
        isOpen: true,
        milestone,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="pt-20 md:pt:24">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-[#10c0dd] transition-colors">
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Projects</span>
            </Link>
            <h1
              className="text-xl md:text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
            >
              Project Details
            </h1>
          </div>

          <div className="mb-1 overflow-hidden">
            <div className="flex items-center gap-3 bg-orange-900/20 border border-orange-600/30 rounded-lg px-4 py-3">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-orange-500"></div>
              <div className="overflow-hidden flex-1">
                <span className="text-orange-400 font-medium text-sm md:text-base">
                  Overdue since 01 Aug, 2025 (8 days)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              {/* EL REA Banner */}
              <Card
                className="bg-card/80 backdrop-blur-sm border-border/50 mb-6"
                style={{ borderRadius: "var(--wui-border-radius-m)" }}
              >
                <CardContent className="p-4 md:p-8">
                  <div className="flex items-center justify-center min-h-[128px] md:min-h-[192px] bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                    <div className="text-center px-4 py-4 max-w-full">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-lg md:text-2xl font-bold text-purple-600">ER</span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-2 break-words">EL REA</h2>
                      <p
                        className="text-xs sm:text-sm md:text-base text-purple-100 leading-tight sm:leading-normal md:leading-relaxed break-words hyphens-auto max-w-full px-2"
                        style={{
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          lineHeight: "1.3",
                        }}
                      >
                        Building core infrastructure for Web3 gaming ecosystems with focus on interoperability and
                        scalability
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Section */}
              <Card
                className="bg-card/80 backdrop-blur-sm border-border/50 mb-6"
                style={{ borderRadius: "var(--wui-border-radius-m)" }}
              >
                <CardContent className="p-4">
                  <div className="flex justify-end mb-2">
                    <span className="text-sm font-semibold text-white">67%</span>
                  </div>
                  <Progress value={67} className="h-2 bg-border [&>div]:bg-[#10c0dd]" />
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 gap-1">
                    <p className="text-xs text-muted-foreground">2 of 3 milestones completed</p>
                    <p className="text-xs text-muted-foreground">16,750 CKB allocated</p>
                  </div>
                </CardContent>
              </Card>

              {/* Project Stats - responsive grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card
                  className="bg-card/80 backdrop-blur-sm border-border/50"
                  style={{ borderRadius: "var(--wui-border-radius-m)" }}
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="text-sm text-muted-foreground mb-1">Budget</h3>
                    <p className="text-lg md:text-xl font-bold text-white">25,000</p>
                  </CardContent>
                </Card>
                <Card
                  className="bg-card/80 backdrop-blur-sm border-border/50"
                  style={{ borderRadius: "var(--wui-border-radius-m)" }}
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="text-sm text-muted-foreground mb-1">Time Left</h3>
                    <p className="text-lg md:text-xl font-bold text-white">2 months left</p>
                  </CardContent>
                </Card>
              </div>

              {/* Project Background */}
              <Card
                className="bg-card/80 backdrop-blur-sm border-border/50 mb-6"
                style={{ borderRadius: "var(--wui-border-radius-m)" }}
              >
                <CardHeader>
                  <CardTitle
                    className="text-white text-lg md:text-xl"
                    style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                  >
                    Project Background
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-muted-foreground mb-4 text-sm md:text-base"
                    style={{ fontFamily: "var(--font-sf-rounded)", lineHeight: "150%", letterSpacing: "0.0015em" }}
                  >
                    EL REA is a pioneering content-driven platform designed to bridge the gap between Spanish-speaking
                    gaming communities and the Spark ecosystem. Our mission is to create engaging, culturally relevant
                    content that introduces and educates Spanish-speaking gamers about the opportunities within Spark's
                    decentralized gaming landscape.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border text-muted-foreground hover:bg-card bg-transparent"
                    onClick={() => window.open("#", "_blank")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Proposal
                  </Button>
                </CardContent>
              </Card>

              {/* Mission & Expertise */}
              <Card
                className="bg-card/80 backdrop-blur-sm border-border/50 mb-6"
                style={{ borderRadius: "var(--wui-border-radius-m)" }}
              >
                <CardHeader>
                  <CardTitle
                    className="text-white text-lg md:text-xl flex items-center justify-between cursor-pointer md:cursor-default"
                    style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                    onClick={() => setIsMissionOpen(!isMissionOpen)}
                  >
                    Mission & Expertise
                    <div className="md:hidden">
                      {isMissionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </CardTitle>
                </CardHeader>
                <div className={`md:block ${isMissionOpen ? "block" : "hidden"}`}>
                  <CardContent>
                    <p
                      className="text-muted-foreground text-sm md:text-base"
                      style={{ fontFamily: "var(--font-sf-rounded)", lineHeight: "150%", letterSpacing: "0.0015em" }}
                    >
                      With deep expertise in gaming culture and blockchain technology, our team specializes in creating
                      compelling narratives that resonate with Spanish-speaking audiences. We understand the unique
                      preferences, gaming habits, and cultural nuances that drive engagement within these communities.
                    </p>
                  </CardContent>
                </div>
              </Card>

              {/* Campaign Goals */}
              <Card
                className="bg-card/80 backdrop-blur-sm border-border/50 mb-6"
                style={{ borderRadius: "var(--wui-border-radius-m)" }}
              >
                <CardHeader>
                  <CardTitle
                    className="text-white text-lg md:text-xl flex items-center justify-between cursor-pointer md:cursor-default"
                    style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                    onClick={() => setIsCampaignGoalsOpen(!isCampaignGoalsOpen)}
                  >
                    Campaign Goals
                    <div className="md:hidden">
                      {isCampaignGoalsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </CardTitle>
                </CardHeader>
                <div className={`md:block ${isCampaignGoalsOpen ? "block" : "hidden"}`}>
                  <CardContent>
                    <p
                      className="text-muted-foreground text-sm md:text-base"
                      style={{ fontFamily: "var(--font-sf-rounded)", lineHeight: "150%", letterSpacing: "0.0015em" }}
                    >
                      Through strategic content creation, community building, and targeted outreach, we aim to onboard
                      10,000+ Spanish-speaking gamers to the Spark ecosystem within the first year. Our comprehensive
                      approach includes educational content, gaming tutorials, community events, and partnerships with
                      influential Spanish-speaking gaming creators.
                    </p>
                  </CardContent>
                </div>
              </Card>

              {/* Mobile Sections */}
              <div className="block lg:hidden mb-6">
                {/* Milestones */}
                <Card
                  className="bg-card/80 backdrop-blur-sm border-border/50"
                  style={{ borderRadius: "var(--wui-border-radius-m)" }}
                >
                  <CardHeader>
                    <CardTitle
                      className="text-white flex items-center justify-between text-lg md:text-xl"
                      style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                    >
                      Milestones
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {milestones.map((milestone, index) => (
                      <div
                        key={milestone.id}
                        className="space-y-2 cursor-pointer hover:bg-card/50 rounded-lg p-2 -m-2 transition-colors"
                        onClick={() => handleMilestoneClick(milestone.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className="bg-white text-black border-white"
                            style={{ borderRadius: "var(--wui-border-radius-xs)" }}
                          >
                            {String(milestone.id).padStart(2, "0")}
                          </Badge>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white text-sm md:text-base">{milestone.title}</span>
                              <Badge
                                className={
                                  milestone.status === "complete"
                                    ? "bg-green-900 text-green-100"
                                    : milestone.status === "overdue"
                                      ? "bg-orange-900 text-orange-100"
                                      : "bg-blue-900 text-blue-100"
                                }
                                style={{ borderRadius: "var(--wui-border-radius-xs)" }}
                              >
                                {milestone.status === "complete"
                                  ? "Complete"
                                  : milestone.status === "overdue"
                                    ? "Overdue"
                                    : "Pending"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground ml-12">{milestone.description}</p>
                        <div className="ml-12">
                          {milestone.status === "complete" ? (
                            <div className="flex items-center gap-1 mt-1">
                              <Check className="w-3 h-3 text-green-500" />
                            </div>
                          ) : milestone.status === "overdue" ? (
                            <div className="mb-2">
                              <div className="flex items-center gap-2 bg-orange-900/20 border border-orange-600/30 rounded px-3 py-2">
                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-orange-500"></div>
                                <span className="text-orange-400 text-xs font-medium">
                                  Overdue since 01 Aug, 2025 (8 days)
                                </span>
                              </div>
                            </div>
                          ) : null}

                          {milestone.progress !== undefined && milestone.status !== "complete" && (
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Progress: {milestone.progress}%</span>
                              </div>
                              <Progress value={milestone.progress} className="h-1 bg-border [&>div]:bg-orange-500" />
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground font-bold mt-1">Budget: {milestone.budget}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Updates */}
                <Card
                  className="bg-card/80 backdrop-blur-sm border-border/50 mt-6"
                  style={{ borderRadius: "var(--wui-border-radius-m)" }}
                >
                  <CardHeader>
                    <CardTitle
                      className="text-white text-lg md:text-xl"
                      style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                    >
                      Recent Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">M</span>
                      </div>
                      <div>
                        <h4
                          className="text-white font-semibold text-sm md:text-base"
                          style={{
                            fontFamily: "var(--font-sf-rounded)",
                            letterSpacing: "0.0025em",
                            lineHeight: "145%",
                          }}
                        >
                          Project Team
                        </h4>
                        <p
                          className="text-sm text-muted-foreground"
                          style={{
                            fontFamily: "var(--font-sf-rounded)",
                            lineHeight: "150%",
                            letterSpacing: "0.0015em",
                          }}
                        >
                          Released the first batch of full content trailers to showcase upcoming series
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews and Payouts - Mobile Only */}
                <Card
                  className="bg-card/80 backdrop-blur-sm border-border/50 mt-6"
                  style={{ borderRadius: "var(--wui-border-radius-m)" }}
                >
                  <CardHeader>
                    <CardTitle
                      className="text-white text-lg md:text-xl flex items-center justify-between cursor-pointer"
                      style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                      onClick={() => setIsReviewPayoutOpen(!isReviewPayoutOpen)}
                    >
                      Review & Payout
                      {isReviewPayoutOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </CardTitle>
                  </CardHeader>
                  <div className={isReviewPayoutOpen ? "block" : "hidden"}>
                    <CardContent className="space-y-6">
                      {/* Reviews Section */}
                      <div>
                        <h4 className="text-white font-semibold mb-3 text-base">Reviews</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-sm text-muted-foreground"
                              style={{ fontFamily: "var(--font-sf-rounded)" }}
                            >
                              Review With:
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-sm text-white" style={{ fontFamily: "var(--font-sf-rounded)" }}>
                              Rock (Next: Dec 20)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Payouts Section */}
                      <div>
                        <h4 className="text-white font-semibold mb-3 text-base">Payouts</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm text-white" style={{ fontFamily: "var(--font-sf-rounded)" }}>
                              $16,750 released (67%)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-white" style={{ fontFamily: "var(--font-sf-rounded)" }}>
                              $8,250 pending final milestone
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>

              {/* Creator Statistics */}
              <Card
                className="bg-card/80 backdrop-blur-sm border-border/50 mb-6"
                style={{ borderRadius: "var(--wui-border-radius-m)" }}
              >
                <CardHeader>
                  <CardTitle
                    className="text-white text-lg md:text-xl"
                    style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                  >
                    Creator Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <h3 className="text-sm text-muted-foreground mb-1">Discord Members</h3>
                      <p className="text-xl md:text-2xl font-bold text-white">10,000+</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-sm text-muted-foreground mb-1">Content Since</h3>
                      <p className="text-xl md:text-2xl font-bold text-white">2020</p>
                    </div>
                  </div>

                  {/* Platform Links under Creator Statistics */}
                  <div>
                    <h3
                      className="text-white mb-3 text-lg md:text-xl"
                      style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                    >
                      Platform Links
                    </h3>
                    <div className="flex flex-wrap gap-2 md:grid md:grid-cols-2 md:gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border text-muted-foreground hover:bg-[#10c0dd] hover:text-white hover:border-[#10c0dd] bg-transparent transition-colors flex-shrink-0 px-2 md:px-4"
                      >
                        <svg className="w-4 h-4 md:mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span className="hidden md:inline">YouTube</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border text-muted-foreground hover:bg-[#10c0dd] hover:text-white hover:border-[#10c0dd] bg-transparent transition-colors flex-shrink-0 px-2 md:px-4"
                      >
                        <svg className="w-4 h-4 md:mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.747 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                        </svg>
                        <span className="hidden md:inline">TikTok</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border text-muted-foreground hover:bg-[#10c0dd] hover:text-white hover:border-[#10c0dd] bg-transparent transition-colors flex-shrink-0 px-2 md:px-4"
                      >
                        <svg className="w-4 h-4 md:mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span className="hidden md:inline">X (Twitter)</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border text-muted-foreground hover:bg-[#10c0dd] hover:text-white hover:border-[#10c0dd] bg-transparent transition-colors flex-shrink-0 px-2 md:px-4"
                      >
                        <svg className="w-4 h-4 md:mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6.857 4.714h1.715v5.143H6.857zm4.715 9.143H13.286V24h-1.714zm-4.715 0h1.715V24H6.857zm9.428 0H18V24h-1.715z" />
                        </svg>
                        <span className="hidden md:inline">Twitch</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Explore Similar Projects */}
              <Card
                className="bg-card/80 backdrop-blur-sm border-border/50 mb-6"
                style={{ borderRadius: "var(--wui-border-radius-m)" }}
              >
                <CardHeader>
                  <CardTitle
                    className="text-white text-lg md:text-xl"
                    style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                  >
                    Explore Similar Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <OtherProgramsCarousel />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-4">
              <div className="hidden lg:block">
                {/* Milestones */}
                <Card
                  className="bg-card/80 backdrop-blur-sm border-border/50 mb-6"
                  style={{ borderRadius: "var(--wui-border-radius-m)" }}
                >
                  <CardHeader>
                    <CardTitle
                      className="text-white flex items-center justify-between text-lg md:text-xl"
                      style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                    >
                      Milestones
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {milestones.map((milestone, index) => (
                      <div
                        key={milestone.id}
                        className="space-y-2 cursor-pointer hover:bg-card/50 rounded-lg p-2 -m-2 transition-colors"
                        onClick={() => handleMilestoneClick(milestone.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className="bg-white text-black border-white"
                            style={{ borderRadius: "var(--wui-border-radius-xs)" }}
                          >
                            {String(milestone.id).padStart(2, "0")}
                          </Badge>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white text-sm md:text-base">{milestone.title}</span>
                              <Badge
                                className={
                                  milestone.status === "complete"
                                    ? "bg-green-900 text-green-100"
                                    : milestone.status === "overdue"
                                      ? "bg-orange-900 text-orange-100"
                                      : "bg-blue-900 text-blue-100"
                                }
                                style={{ borderRadius: "var(--wui-border-radius-xs)" }}
                              >
                                {milestone.status === "complete"
                                  ? "Complete"
                                  : milestone.status === "overdue"
                                    ? "Overdue"
                                    : "Pending"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground ml-12">{milestone.description}</p>
                        <div className="ml-12">
                          {milestone.status === "complete" ? (
                            <div className="flex items-center gap-1 mt-1">
                              <Check className="w-3 h-3 text-green-500" />
                            </div>
                          ) : milestone.status === "overdue" ? (
                            <div className="mb-2">
                              <div className="flex items-center gap-2 bg-orange-900/20 border border-orange-600/30 rounded px-3 py-2">
                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-orange-500"></div>
                                <span className="text-orange-400 text-xs font-medium">
                                  Overdue since 01 Aug, 2025 (8 days)
                                </span>
                              </div>
                            </div>
                          ) : null}

                          {milestone.progress !== undefined && milestone.status !== "complete" && (
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Progress: {milestone.progress}%</span>
                              </div>
                              <Progress value={milestone.progress} className="h-1 bg-border [&>div]:bg-orange-500" />
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground font-bold mt-1">Budget: {milestone.budget}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Updates */}
                <Card
                  className="bg-card/80 backdrop-blur-sm border-border/50 mb-6"
                  style={{ borderRadius: "var(--wui-border-radius-m)" }}
                >
                  <CardHeader>
                    <CardTitle
                      className="text-white text-lg md:text-xl"
                      style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                    >
                      Recent Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">M</span>
                      </div>
                      <div>
                        <h4
                          className="text-white font-semibold text-sm md:text-base"
                          style={{
                            fontFamily: "var(--font-sf-rounded)",
                            letterSpacing: "0.0025em",
                            lineHeight: "145%",
                          }}
                        >
                          Project Team
                        </h4>
                        <p
                          className="text-sm text-muted-foreground"
                          style={{
                            fontFamily: "var(--font-sf-rounded)",
                            lineHeight: "150%",
                            letterSpacing: "0.0015em",
                          }}
                        >
                          Released the first batch of full content trailers to showcase upcoming series
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews */}
                <Card
                  className="bg-card/80 backdrop-blur-sm border-border/50 mb-6"
                  style={{ borderRadius: "var(--wui-border-radius-m)" }}
                >
                  <CardHeader>
                    <CardTitle
                      className="text-white flex items-center justify-between text-lg md:text-xl"
                      style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                    >
                      Reviews
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm text-muted-foreground"
                          style={{ fontFamily: "var(--font-sf-rounded)" }}
                        >
                          Review With:
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-white" style={{ fontFamily: "var(--font-sf-rounded)" }}>
                          Rock (Next: Dec 20)
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payouts */}
                <Card
                  className="bg-card/80 backdrop-blur-sm border-border/50 mb-6"
                  style={{ borderRadius: "var(--wui-border-radius-m)" }}
                >
                  <CardHeader>
                    <CardTitle
                      className="text-white flex items-center justify-between text-lg md:text-xl"
                      style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                    >
                      Payouts
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm text-white" style={{ fontFamily: "var(--font-sf-rounded)" }}>
                          $16,750 released (67%)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-white" style={{ fontFamily: "var(--font-sf-rounded)" }}>
                          $8,250 pending final milestone
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone details popup */}
      <MilestoneDetailsPopup
        isOpen={milestonePopup.isOpen}
        onClose={() => setMilestonePopup({ isOpen: false, milestone: null })}
        milestone={milestonePopup.milestone}
      />
    </div>
  )
}

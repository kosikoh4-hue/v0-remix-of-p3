"use client"

import type React from "react"
import { LayoutGrid, List, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table as ShadcnTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState("new")
  const itemsPerPage = 6

  const grantPrograms = [
    {
      id: "PC",
      name: "Core Systems",
      grantee: "Core Systems",
      granteeEmail: "core@systems.com",
      category: "Infrastructure",
      totalFunding: 1250000,
      fundsSpent: 900000,
      remaining: 350000,
      startDate: "2023-01",
      endDate: "2024-01",
      duration: "2 months left",
      status: "Active",
      statusColor: "bg-green-900 text-green-100",
      riskStatus: "Low Risk",
      riskColor: "bg-green-500",
      progress: 78,
      progressColor: "from-green-500 to-green-600",
      avatarBg: "bg-blue-600",
      avatarSrc: "/avatars/kurchato.png",
      location: "France",
      walletAddress: "0x6E...8ae3",
      starRating: 4,
      vpAmount: "4.3m VP",
      lastUpdate: "2024-06-20",
      nextUpdate: "2024-07-15",
      milestonesSummary: "Core bridge contracts designed",
      link: "/individual-project",
      description: `Building core infrastructure for Web3 gaming ecosystems with focus on interoperability and scalability.`,
      createdDate: "2024-06-20",
    },
    {
      id: "DL",
      name: "Developer Labs",
      grantee: "Developer Labs",
      granteeEmail: "dev@labs.com",
      category: "Development",
      totalFunding: 850000,
      fundsSpent: 425000,
      remaining: 425000,
      startDate: "2023-03",
      endDate: "2024-03",
      duration: "4 months left",
      status: "Active",
      statusColor: "bg-green-900 text-green-100",
      riskStatus: "Medium Risk",
      riskColor: "bg-yellow-500",
      progress: 50,
      progressColor: "from-blue-500 to-blue-600",
      avatarBg: "bg-purple-600",
      avatarSrc: "/avatars/dev-labs.png",
      location: "USA",
      walletAddress: "0x7F...9bf4",
      starRating: 5,
      vpAmount: "2.1m VP",
      lastUpdate: "2024-06-18",
      nextUpdate: "2024-07-20",
      milestonesSummary: "Lorem ipsum dolor sit amet",
      link: "/individual-project",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      createdDate: "2024-06-18",
    },
    {
      id: "CI",
      name: "Creative Initiative",
      grantee: "Creative Initiative",
      granteeEmail: "creative@initiative.com",
      category: "Content",
      totalFunding: 650000,
      fundsSpent: 195000,
      remaining: 455000,
      startDate: "2023-05",
      endDate: "2024-05",
      duration: "6 months left",
      status: "Planning",
      statusColor: "bg-blue-900 text-blue-100",
      riskStatus: "Low Risk",
      riskColor: "bg-green-500",
      progress: 30,
      progressColor: "from-purple-500 to-purple-600",
      avatarBg: "bg-pink-600",
      avatarSrc: "/avatars/creative.png",
      location: "Canada",
      walletAddress: "0x8G...0ce5",
      starRating: 4,
      vpAmount: "1.8m VP",
      lastUpdate: "2024-06-15",
      nextUpdate: "2024-07-25",
      milestonesSummary: "Ut enim ad minim veniam",
      link: "/individual-project",
      description: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      createdDate: "2024-06-15",
    },
    {
      id: "RF",
      name: "Research Foundation",
      grantee: "Research Foundation",
      granteeEmail: "research@foundation.org",
      category: "Research",
      totalFunding: 1100000,
      fundsSpent: 770000,
      remaining: 330000,
      startDate: "2023-02",
      endDate: "2024-02",
      duration: "1 week left",
      status: "Review",
      statusColor: "bg-purple-900 text-purple-100",
      riskStatus: "High Risk",
      riskColor: "bg-red-500",
      progress: 70,
      progressColor: "from-orange-500 to-orange-600",
      avatarBg: "bg-indigo-600",
      avatarSrc: "/avatars/research.png",
      location: "UK",
      walletAddress: "0x9H...1df6",
      starRating: 3,
      vpAmount: "3.2m VP",
      lastUpdate: "2024-06-12",
      nextUpdate: "2024-07-30",
      milestonesSummary: "Duis aute irure dolor in reprehenderit",
      link: "/individual-project",
      description: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      createdDate: "2024-06-12",
    },
    {
      id: "AI",
      name: "AI Innovation Hub",
      grantee: "AI Innovation Hub",
      granteeEmail: "ai@innovation.hub",
      category: "Technology",
      totalFunding: 950000,
      fundsSpent: 285000,
      remaining: 665000,
      startDate: "2023-04",
      endDate: "2024-04",
      duration: "3 months left",
      status: "Active",
      statusColor: "bg-green-900 text-green-100",
      riskStatus: "Low Risk",
      riskColor: "bg-green-500",
      progress: 30,
      progressColor: "from-teal-500 to-teal-600",
      avatarBg: "bg-teal-600",
      avatarSrc: "/avatars/ai-hub.png",
      location: "Germany",
      walletAddress: "0xAI...2gh7",
      starRating: 5,
      vpAmount: "2.8m VP",
      lastUpdate: "2024-06-22",
      nextUpdate: "2024-07-18",
      milestonesSummary: "Lorem ipsum dolor sit amet consectetur",
      link: "/individual-project",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
      createdDate: "2024-06-22",
    },
    {
      id: "BC",
      name: "Blockchain Commons",
      grantee: "Blockchain Commons",
      granteeEmail: "blockchain@commons.org",
      category: "Infrastructure",
      totalFunding: 750000,
      fundsSpent: 525000,
      remaining: 225000,
      startDate: "2023-01",
      endDate: "2024-01",
      duration: "5 days left",
      status: "Review",
      statusColor: "bg-purple-900 text-purple-100",
      riskStatus: "Medium Risk",
      riskColor: "bg-yellow-500",
      progress: 70,
      progressColor: "from-indigo-500 to-indigo-600",
      avatarBg: "bg-indigo-600",
      avatarSrc: "/avatars/blockchain.png",
      location: "Singapore",
      walletAddress: "0xBC...3kl9",
      starRating: 4,
      vpAmount: "1.9m VP",
      lastUpdate: "2024-06-19",
      nextUpdate: "2024-07-22",
      milestonesSummary: "Quis nostrud exercitation ullamco",
      link: "/individual-project",
      description: `Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.`,
      createdDate: "2024-06-19",
    },
    {
      id: "ED",
      name: "Education Platform",
      grantee: "Education Platform",
      granteeEmail: "education@platform.edu",
      category: "Education",
      totalFunding: 450000,
      fundsSpent: 135000,
      remaining: 315000,
      startDate: "2023-06",
      endDate: "2024-06",
      duration: "8 months left",
      status: "Planning",
      statusColor: "bg-blue-900 text-blue-100",
      riskStatus: "Low Risk",
      riskColor: "bg-green-500",
      progress: 30,
      progressColor: "from-emerald-500 to-emerald-600",
      avatarBg: "bg-emerald-600",
      avatarSrc: "/avatars/education.png",
      location: "Australia",
      walletAddress: "0xED...4mn2",
      starRating: 4,
      vpAmount: "1.2m VP",
      lastUpdate: "2024-06-17",
      nextUpdate: "2024-07-28",
      milestonesSummary: "Excepteur sint occaecat cupidatat",
      link: "/individual-project",
      description: `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis.`,
      createdDate: "2024-06-17",
    },
    {
      id: "SC",
      name: "Smart Contracts Lab",
      grantee: "Smart Contracts Lab",
      granteeEmail: "smart@contracts.lab",
      category: "Development",
      totalFunding: 1200000,
      fundsSpent: 360000,
      remaining: 840000,
      startDate: "2023-03",
      endDate: "2024-03",
      duration: "7 months left",
      status: "Active",
      statusColor: "bg-green-900 text-green-100",
      riskStatus: "Medium Risk",
      riskColor: "bg-yellow-500",
      progress: 30,
      progressColor: "from-cyan-500 to-cyan-600",
      avatarBg: "bg-cyan-600",
      avatarSrc: "/avatars/smart-contracts.png",
      location: "Netherlands",
      walletAddress: "0xSC...5op8",
      starRating: 5,
      vpAmount: "3.5m VP",
      lastUpdate: "2024-06-21",
      nextUpdate: "2024-07-19",
      milestonesSummary: "Nemo enim ipsam voluptatem",
      link: "/individual-project",
      description: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
      createdDate: "2024-06-21",
    },
  ]

  const recentUpdates = [
    {
      id: 1,
      title: "Core Systems Milestone 3 Completed",
      description: "Successfully deployed interoperable system infrastructure on test environment with 99.9% uptime.",
      timestamp: "2 hours ago",
      type: "milestone",
      project: "Core Systems",
      link: "/individual-project",
    },
    {
      id: 2,
      title: "Risk Alert: Creative Dev Project",
      description:
        "Project timeline has been extended by 2 weeks due to security audit findings requiring additional fixes.",
      timestamp: "4 hours ago",
      type: "alert",
      project: "Creative Dev",
      link: "/individual-project",
    },
    {
      id: 3,
      title: "New Grant Application Submitted",
      description:
        "Innovation Education Initiative has submitted a proposal for $75,000 funding for developer training programs.",
      timestamp: "6 hours ago",
      type: "application",
      project: "Web3 Education Initiative",
      link: "/individual-project",
    },
    {
      id: 4,
      title: "Framework Labs Payment Released",
      description: "Milestone 2 payment of $125,000 has been successfully processed and released to the team.",
      timestamp: "8 hours ago",
      type: "payment",
      project: "Framework Labs",
      link: "/individual-project",
    },
    {
      id: 5,
      title: "Innovation Foundation Quarterly Review",
      description: "Q4 2024 review completed with 92% milestone completion rate across all active projects.",
      timestamp: "12 hours ago",
      type: "review",
      project: "Innovation Foundation",
      link: "/individual-project",
    },
  ]

  const sortedPrograms = [...grantPrograms].sort((a, b) => {
    if (sortOrder === "new") {
      return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    } else {
      return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
    }
  })

  const totalPages = Math.ceil(sortedPrograms.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPrograms = sortedPrograms.slice(startIndex, endIndex)

  const formatCurrency = (amount: number) => {
    return `$${(amount / 1000).toFixed(0)}K`
  }

  return (
    <div className="min-h-screen bg-background text-white font-sf-rounded pt-20">
      <div
        className="max-w-[1400px] mx-auto px-4 md:px-8 pt-0"
        style={
          {
            "--wui-spacing-xs": "4px",
            "--wui-spacing-s": "8px",
            "--wui-spacing-m": "12px",
            "--wui-spacing-l": "16px",
            "--wui-spacing-xl": "20px",
            "--wui-spacing-2xl": "24px",
            "--wui-spacing-3xl": "32px",
            "--wui-border-radius-xs": "4px",
            "--wui-border-radius-s": "8px",
            "--wui-border-radius-m": "12px",
            "--wui-border-radius-l": "16px",
            "--wui-border-radius-xl": "20px",
          } as React.CSSProperties
        }
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-2 md:gap-6 mb-6 md:mb-8 mt-6">
          <Card
            className="bg-card/80 backdrop-blur-sm border-border/50"
            style={{ borderRadius: "var(--wui-border-radius-m)" }}
          >
            <CardContent className="p-2 md:p-6 text-center">
              <h3
                className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2"
                style={{ fontFamily: "var(--font-sf-rounded)" }}
              >
                Total Funds
              </h3>
              <p className="text-lg md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-sf-rounded)" }}>
                $4.41M
              </p>
            </CardContent>
          </Card>
          <Card
            className="bg-card/80 backdrop-blur-sm border-border/50"
            style={{ borderRadius: "var(--wui-border-radius-m)" }}
          >
            <CardContent className="p-2 md:p-6 text-center">
              <h3
                className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2"
                style={{ fontFamily: "var(--font-sf-rounded)" }}
              >
                Total Projects
              </h3>
              <p className="text-lg md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-sf-rounded)" }}>
                135
              </p>
            </CardContent>
          </Card>
          <Card
            className="bg-card/80 backdrop-blur-sm border-border/50"
            style={{ borderRadius: "var(--wui-border-radius-m)" }}
          >
            <CardContent className="p-2 md:p-6 text-center">
              <h3
                className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2"
                style={{ fontFamily: "var(--font-sf-rounded)" }}
              >
                Delayed Projects
              </h3>
              <p className="text-lg md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-sf-rounded)" }}>
                3
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Header Section */}
        <div className="mb-6 md:mb-8 -mx-4 md:-mx-8 px-4 md:px-8 py-4 md:py-6 backdrop-blur-xl bg-background/80 border-b border-white/10">
          <div className="hidden md:block">
            <h1
              className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-2"
              style={{
                fontFamily: "var(--font-sf-rounded)",
                letterSpacing: "0.0025em",
                lineHeight: "145%",
                color: "#10c0dd",
              }}
            >
              <Star className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#10c0dd", fill: "#10c0dd" }} />
              <span className="text-lg md:text-xl font-bold" style={{ color: "white" }}>
                Check out the newest grant programs!
              </span>
            </h1>
            <p
              className="text-muted-foreground text-xs md:text-sm lg:text-base mt-2 flex items-center gap-2"
              style={{
                fontFamily: "var(--font-sf-rounded)",
                letterSpacing: "0.0015em",
                lineHeight: "150%",
              }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              135 projects found
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Programs Section */}
          <div className="flex-1 w-full">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2
                  className="text-lg md:text-xl font-bold text-white"
                  style={{
                    fontFamily: "var(--font-sf-rounded)",
                    letterSpacing: "0.0025em",
                    lineHeight: "145%",
                  }}
                >
                  Programs
                </h2>
                <div className="flex items-center gap-2">
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger
                      className="w-[80px] md:w-[100px] bg-card/80 backdrop-blur-sm border-border/50 text-muted-foreground text-xs md:text-sm"
                      style={{ borderRadius: "var(--wui-border-radius-s)" }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-xl text-white border-border/50">
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`border-border text-muted-foreground w-8 h-8 md:w-10 md:h-10 hover:bg-[#10c0dd] hover:text-white hover:border-[#10c0dd] transition-colors ${viewMode === "grid" ? "bg-card/80 backdrop-blur-sm" : ""}`}
                    onClick={() => setViewMode("grid")}
                    style={{ borderRadius: "var(--wui-border-radius-s)" }}
                  >
                    <LayoutGrid className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`border-border text-muted-foreground w-8 h-8 md:w-10 md:h-10 hover:bg-[#10c0dd] hover:text-white hover:border-[#10c0dd] transition-colors ${viewMode === "table" ? "bg-[#10c0dd] text-white border-[#10c0dd]" : ""}`}
                    onClick={() => setViewMode("table")}
                    style={{ borderRadius: "var(--wui-border-radius-s)" }}
                  >
                    <List className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                </div>
              </div>

              {/* Programs Grid/Table */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {currentPrograms.map((program, index) => (
                    <Card
                      key={program.id}
                      className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-[#1b7382] transition-colors duration-300 group"
                      style={{ borderRadius: "var(--wui-border-radius-m)", borderWidth: "1px" }}
                    >
                      <Link href={program.link} className="block cursor-pointer h-full">
                        <CardContent className="p-4 md:p-6 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-3 md:mb-4">
                            <h3
                              className="text-white font-semibold text-base md:text-lg"
                              style={{
                                fontFamily: "var(--font-sf-rounded)",
                                letterSpacing: "0.0025em",
                                lineHeight: "145%",
                              }}
                            >
                              {program.name}
                            </h3>
                            <Badge
                              className={`${program.statusColor} text-white border-0 text-xs`}
                              style={{ borderRadius: "var(--wui-border-radius-xs)" }}
                            >
                              {program.status}
                            </Badge>
                          </div>

                          <p
                            className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 flex-1"
                            style={{
                              fontFamily: "var(--font-sf-rounded)",
                              lineHeight: "150%",
                              letterSpacing: "0.0015em",
                            }}
                          >
                            {program.description}
                          </p>

                          <div className="flex items-center justify-between mb-3">
                            <span
                              className="text-white text-xs md:text-sm"
                              style={{ fontFamily: "var(--font-sf-rounded)" }}
                            >
                              Budget: {formatCurrency(program.totalFunding)}
                            </span>
                            <span
                              className="text-muted-foreground text-xs md:text-sm"
                              style={{ fontFamily: "var(--font-sf-rounded)" }}
                            >
                              Time Left: {program.duration}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <Badge
                              variant="outline"
                              className="bg-blue-600/10 text-blue-300 border-blue-600/20 text-xs"
                              style={{ borderRadius: "var(--wui-border-radius-xs)" }}
                            >
                              {program.category}
                            </Badge>
                            <span
                              className="text-white font-semibold text-xs md:text-sm"
                              style={{ fontFamily: "var(--font-sf-rounded)" }}
                            >
                              {program.progress}%
                            </span>
                          </div>

                          {/* Updated Progress Bars with gradient */}
                          <Progress
                            value={program.progress}
                            className="h-2 bg-gray-700/50 [&>div]:bg-gradient-to-r [&>div]:from-[#10c0dd] [&>div]:to-[#0ea5e9]"
                            style={{ borderRadius: "var(--wui-border-radius-xs)" }}
                          />
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div
                    className="border border-border/50 overflow-hidden bg-card/80 backdrop-blur-sm min-w-[800px]"
                    style={{ borderRadius: "var(--wui-border-radius-s)" }}
                  >
                    <ShadcnTable>
                      <TableHeader>
                        <TableRow className="border-border bg-card">
                          <TableHead className="text-muted-foreground">Project Name</TableHead>
                          <TableHead className="text-muted-foreground">Grantee</TableHead>
                          <TableHead className="text-muted-foreground">Email</TableHead>
                          <TableHead className="text-muted-foreground">Category</TableHead>
                          <TableHead className="text-muted-foreground">Total Funding</TableHead>
                          <TableHead className="text-muted-foreground">Funds Spent</TableHead>
                          <TableHead className="text-muted-foreground">Remaining</TableHead>
                          <TableHead className="text-muted-foreground">Time Left</TableHead>
                          <TableHead className="text-muted-foreground">Status</TableHead>
                          <TableHead className="text-muted-foreground">Progress</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentPrograms.map((program) => (
                          <TableRow
                            key={program.id}
                            className="border-border hover:bg-card/50 transition-colors duration-300 cursor-pointer"
                            onClick={() => router.push(program.link)}
                          >
                            <TableCell className="font-medium text-white hover:underline">{program.name}</TableCell>
                            <TableCell className="text-muted-foreground">{program.grantee}</TableCell>
                            <TableCell className="text-muted-foreground">{program.granteeEmail}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="border-border text-muted-foreground transition-all duration-300"
                              >
                                {program.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {formatCurrency(program.totalFunding)}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {formatCurrency(program.fundsSpent)}
                            </TableCell>
                            <TableCell className="text-muted-foreground">{formatCurrency(program.remaining)}</TableCell>
                            <TableCell className="text-muted-foreground">{program.duration}</TableCell>
                            <TableCell>
                              <Badge className={`${program.statusColor} text-white border-0`}>{program.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {/* Updated Table Progress Bars with gradient */}
                                <Progress
                                  value={program.progress}
                                  className="h-2 w-20 bg-border [&>div]:bg-gradient-to-r [&>div]:from-[#10c0dd] [&>div]:to-[#0ea5e9]"
                                />
                                <span className="text-sm text-muted-foreground">{program.progress}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </ShadcnTable>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mb-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(page)
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <div className="mb-12 text-center">
              <p className="text-muted-foreground text-xs md:text-sm" style={{ fontFamily: "var(--font-sf-rounded)" }}>
                Showing {startIndex + 1}-{Math.min(endIndex, sortedPrograms.length)} of {sortedPrograms.length} grants
              </p>
            </div>
          </div>

          {/* Recent Updates Section */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2
                className="text-lg md:text-xl font-bold text-white"
                style={{
                  fontFamily: "var(--font-sf-rounded)",
                  letterSpacing: "0.0025em",
                  lineHeight: "145%",
                }}
              >
                Recent Updates
              </h2>
            </div>

            <div className="space-y-3 md:space-y-4">
              {recentUpdates.map((update, index) => (
                <div key={update.id} className="mb-3 md:mb-4">
                  <Link href={update.link}>
                    <Card
                      className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-[#1b7382] transition-colors duration-300 group cursor-pointer"
                      style={{ borderRadius: "var(--wui-border-radius-s)", borderWidth: "1px" }}
                    >
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3
                            className="text-white font-semibold text-xs md:text-sm flex-1"
                            style={{
                              fontFamily: "var(--font-sf-rounded)",
                              letterSpacing: "0.0025em",
                              lineHeight: "145%",
                            }}
                          >
                            {update.title}
                          </h3>
                          <span
                            className="text-muted-foreground text-xs whitespace-nowrap ml-2"
                            style={{ fontFamily: "var(--font-sf-rounded)" }}
                          >
                            {update.timestamp}
                          </span>
                        </div>

                        <p
                          className="text-muted-foreground text-xs mb-3 line-clamp-2"
                          style={{
                            fontFamily: "var(--font-sf-rounded)",
                            lineHeight: "150%",
                            letterSpacing: "0.0015em",
                          }}
                        >
                          {update.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-1 md:gap-2">
                          <Badge
                            variant="outline"
                            className="border-border/30 text-muted-foreground text-xs bg-white/5"
                            style={{ borderRadius: "var(--wui-border-radius-xs)" }}
                          >
                            {update.project}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="border-border/30 text-muted-foreground text-xs capitalize bg-white/5"
                            style={{ borderRadius: "var(--wui-border-radius-xs)" }}
                          >
                            {update.type}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-8 mb-16 text-center md:hidden">
              <p className="text-muted-foreground text-xs" style={{ fontFamily: "var(--font-sf-rounded)" }}>
                Pull down to refresh
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

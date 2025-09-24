"use client"

import { useEffect } from "react"
import { AlertTriangle, Download, Settings, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function AdminControlPage() {
  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const recentTransactions = [
    {
      title: "Grant Payment - Innovation Labs",
      description: "Milestone 2 completion",
      amount: "-$200,000",
      status: "Confirmed",
      statusColor: "bg-green-500 text-white",
      time: "2 hours ago",
      progress: "3/5",
      icon: <ArrowDown className="w-4 h-4 text-red-400" />,
    },
    {
      title: "Revenue Collection Investment returns",
      description: "Compound rewards",
      amount: "+$15,420",
      status: "Confirmed",
      statusColor: "bg-green-500 text-white",
      time: "4 hours ago",
      progress: "Auto",
      icon: <ArrowUp className="w-4 h-4 text-green-400" />,
    },
    {
      title: "Emergency Payment Critical system maintenance",
      description: "Critical infrastructure",
      amount: "-$500,000",
      status: "Pending",
      statusColor: "bg-yellow-500 text-white",
      time: "6 hours ago",
      progress: "2/5",
      icon: <ArrowDown className="w-4 h-4 text-red-400" />,
    },
    {
      title: "Grant Payment - GreenTech Initiative",
      description: "Phase 1 funding",
      amount: "-$150,000",
      status: "Confirmed",
      statusColor: "bg-green-500 text-white",
      time: "8 hours ago",
      progress: "4/5",
      icon: <ArrowDown className="w-4 h-4 text-red-400" />,
    },
    {
      title: "Incentive Rewards Program rewards distribution",
      description: "Staking rewards distribution",
      amount: "+$28,750",
      status: "Confirmed",
      statusColor: "bg-green-500 text-white",
      time: "12 hours ago",
      progress: "Auto",
      icon: <ArrowUp className="w-4 h-4 text-green-400" />,
    },
  ]

  const treasuryFunds = [
    {
      name: "Main Treasury",
      balance: "$8.2M",
      change: "+2.4% (24h)",
      changeColor: "text-green-400",
      status: "ACTIVE",
      statusColor: "bg-green-500 text-white",
      lastUpdated: "4h ago",
    },
    {
      name: "Grant Pool",
      balance: "$3.1M",
      change: "+0.8% (24h)",
      changeColor: "text-green-400",
      status: "ACTIVE",
      statusColor: "bg-green-500 text-white",
      lastUpdated: "7h ago",
    },
    {
      name: "Operations Fund",
      balance: "$1.5M",
      change: "-3.2% (24h)",
      changeColor: "text-red-400",
      status: "ALERT",
      statusColor: "bg-yellow-500 text-white",
      lastUpdated: "0h ago",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-white">Treasury Controls Dashboard</h1>
              <p className="text-muted-foreground text-lg">Monitor and manage treasury operations and security.</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-border text-muted-foreground hover:bg-[#1A1F2E] bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-accent hover:bg-accent/80 text-white">
                <Settings className="w-4 h-4 mr-2" />
                Configure Alerts
              </Button>
            </div>
          </div>
        </div>

        {/* Security Alert */}
        <div className="mb-8">
          <Card className="bg-red-900/20 border-red-600">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-400 mb-1">Project Risk Alert</h3>
                  <p className="text-muted-foreground text-sm">
                    Project Alpha is 2 months late on delivery. Key milestones are slipping beyond scheduled timelines.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Multi-Sig Security */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-white">Project Security</CardTitle>
                <Badge className="bg-green-500 text-white">ACTIVE</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Active Projects</p>
                  <p className="text-2xl font-bold text-white">24</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Risk Score</p>
                  <p className="text-2xl font-bold text-white">92.1%</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Pending Reviews</p>
                  <p className="text-2xl font-bold text-white">5</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Compliance Status</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-white">96.8%</p>
                    <Progress value={96.8} className="h-2 flex-1 bg-gray-700 [&>div]:bg-accent" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spending Analysis */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-white">Funding Analysis</CardTitle>
                <Badge className="bg-yellow-500 text-white">REVIEW NEEDED</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Total Budget</p>
                  <p className="text-2xl font-bold text-white">$4.8M</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Budget Remaining</p>
                  <p className="text-2xl font-bold text-white">$1.6M</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Alerts Triggered</p>
                  <p className="text-2xl font-bold text-white">7</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Budget Available</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-white">33%</p>
                    <Progress value={33} className="h-2 flex-1 bg-gray-700 [&>div]:bg-accent" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Treasury Funds */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {treasuryFunds.map((fund, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{fund.name}</h3>
                    <Badge className={fund.statusColor}>{fund.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">BALANCE • UPDATED {fund.lastUpdated}</p>
                  <p className="text-2xl font-bold text-white mb-2">{fund.balance}</p>
                  <p className={`text-sm ${fund.changeColor}`}>{fund.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
            <Button variant="link" className="text-accent p-0 h-auto">
              View All
            </Button>
          </div>
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <div className="space-y-0">
                {recentTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-6 border-b border-border last:border-b-0 hover:bg-[#1A1F2E]/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">{transaction.icon}</div>
                      <div>
                        <h4 className="text-white font-medium">{transaction.title}</h4>
                        <p className="text-muted-foreground text-sm">
                          {transaction.description} • {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p
                          className={`font-medium ${
                            transaction.amount.startsWith("+") ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {transaction.amount}
                        </p>
                        <p className="text-muted-foreground text-sm">{transaction.progress}</p>
                      </div>
                      <Badge className={transaction.statusColor}>{transaction.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">© 2025 Our Organization. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

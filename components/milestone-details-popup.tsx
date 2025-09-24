"use client"
import { X, CheckCircle, Clock, AlertTriangle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MilestoneDetailsPopupProps {
  isOpen: boolean
  onClose: () => void
  milestone: {
    id: number
    title: string
    description: string
    status: "complete" | "overdue" | "pending"
    budget: string
    dueDate?: string
    completionDate?: string
    progress?: number
    deliverables?: string[]
    assignee?: string
    notes?: string
  }
}

function MilestoneDetailsPopup({ isOpen, onClose, milestone }: MilestoneDetailsPopupProps) {
  if (!isOpen) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-900 text-green-100"
      case "overdue":
        return "bg-orange-900 text-orange-100"
      case "pending":
        return "bg-blue-900 text-blue-100"
      default:
        return "bg-gray-900 text-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "overdue":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <Card
        className="relative bg-card/95 backdrop-blur-xl border-border/50 w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
        style={{ borderRadius: "var(--wui-border-radius-m)" }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
          <CardTitle
            className="text-white text-xl font-bold"
            style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
          >
            Milestone Details
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground hover:text-white">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6 overflow-y-auto flex-1 px-6 pb-6">
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3
                  className="text-white font-semibold text-lg mb-2"
                  style={{ fontFamily: "var(--font-sf-rounded)", letterSpacing: "0.0025em", lineHeight: "145%" }}
                >
                  {milestone.title}
                </h3>
                <p
                  className="text-muted-foreground text-sm"
                  style={{ fontFamily: "var(--font-sf-rounded)", lineHeight: "150%", letterSpacing: "0.0015em" }}
                >
                  {milestone.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(milestone.status)}
                <Badge
                  className={getStatusColor(milestone.status)}
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

          {/* Details Grid - Only showing completion date if available */}
          {milestone.completionDate && (
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="text-sm font-semibold text-white">{milestone.completionDate}</p>
                </div>
              </div>
            </div>
          )}

          {/* Deliverables */}
          {milestone.deliverables && milestone.deliverables.length > 0 && (
            <div className="space-y-3">
              <h4
                className="text-white font-semibold flex items-center gap-2"
                style={{ fontFamily: "var(--font-sf-rounded)" }}
              >
                <FileText className="w-4 h-4" />
                Deliverables
              </h4>
              <div className="space-y-2">
                {milestone.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-card/30 rounded">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-sf-rounded)" }}>
                      {deliverable}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {milestone.notes && (
            <div className="space-y-3">
              <h4 className="text-white font-semibold" style={{ fontFamily: "var(--font-sf-rounded)" }}>
                Notes
              </h4>
              <div className="p-3 bg-card/30 rounded-lg">
                <p
                  className="text-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-sf-rounded)", lineHeight: "150%" }}
                >
                  {milestone.notes}
                </p>
              </div>
            </div>
          )}

          {/* Overdue Alert */}
          {milestone.status === "overdue" && (
            <div className="flex items-center gap-2 bg-orange-900/20 border border-orange-600/30 rounded-lg px-4 py-3">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-orange-400 font-medium text-sm">This milestone is overdue</p>
                <p className="text-orange-300 text-xs">Please review and update the timeline or deliverables</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default MilestoneDetailsPopup

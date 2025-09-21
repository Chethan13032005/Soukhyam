"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button" 
import { AlertTriangle, Phone, ExternalLink } from "lucide-react"

interface SOSModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SOSModal({ open, onOpenChange }: SOSModalProps) {
  const handleEmergencyCall = () => {
    // In a real app, this would trigger actual emergency protocols
    alert("Connecting to Campus Emergency Services...")
    onOpenChange(false)
  }

  const handleHelplineCall = () => {
    // In a real app, this would connect to national helpline
    alert("Connecting to National Mental Health Helpline...")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl shadow-2xl border-0 p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-extrabold text-red-600 flex items-center justify-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8 animate-pulse text-red-500" />
            Immediate Support Needed?
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-2">
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-6">
              If you're in crisis or need immediate support, help is available right now.<br />
              <span className="text-base text-gray-500">Your safety and wellbeing are our top priority. All services are confidential and available 24/7.</span>
            </p>
          </div>
          <div className="space-y-4">
            <Button
              onClick={handleEmergencyCall}
              className="w-full h-16 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-xl flex items-center justify-center shadow-lg"
              size="lg"
            >
              <Phone className="w-6 h-6 mr-3" />
              Call Campus Emergency
              <span className="ml-auto text-sm opacity-80">24/7</span>
            </Button>
            <Button
              onClick={handleHelplineCall}
              variant="outline"
              className="w-full h-16 border-red-400 text-red-600 hover:bg-red-50 text-lg font-bold rounded-xl flex items-center justify-center shadow"
              size="lg"
            >
              <ExternalLink className="w-6 h-6 mr-3" />
              Contact National Helpline
              <span className="ml-auto text-sm opacity-80">Free</span>
            </Button>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground mt-4">
          <p>Your safety and wellbeing are our top priority.</p>
          <p>All calls are confidential and available 24/7.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

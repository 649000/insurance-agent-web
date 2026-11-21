import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Plus, Users, AlertCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Mobile-first Hero / Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Family Insurance Portfolio</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track policy coverage, child protection, and Singapore benchmark gaps.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="mr-1.5 h-4 w-4" /> Add Policy
          </Button>
        </div>
      </div>

      {/* Profile Selector Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-primary bg-primary/5 cursor-pointer transition-colors">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary mb-2">
              AT
            </div>
            <span className="font-semibold text-sm">Alice Tan</span>
            <span className="text-xs text-muted-foreground">Self (Primary)</span>
          </CardContent>
        </Card>

        <Card className="hover:border-slate-300 cursor-pointer transition-colors">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 mb-2">
              LT
            </div>
            <span className="font-semibold text-sm">Lucas Tan</span>
            <span className="text-xs text-muted-foreground">Child (Dependent)</span>
          </CardContent>
        </Card>

        <Card className="border-dashed border-2 flex items-center justify-center p-4 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-colors">
          <div className="flex flex-col items-center text-center text-muted-foreground">
            <Users className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">+ Add Child Profile</span>
          </div>
        </Card>
      </div>

      {/* Coverage Status Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Total Protection</CardDescription>
            <CardTitle className="text-xl font-bold">S$ 1,500,000</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground flex items-center text-emerald-600 font-medium">
              <ShieldCheck className="mr-1 h-3.5 w-3.5 inline" /> Life & Critical Illness active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Annual Premium</CardDescription>
            <CardTitle className="text-xl font-bold">S$ 3,770 / yr</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Across 3 active policies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Coverage Gaps</CardDescription>
            <CardTitle className="text-xl font-bold text-amber-600">1 Gap Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground flex items-center text-amber-600 font-medium">
              <AlertCircle className="mr-1 h-3.5 w-3.5 inline" /> Disability income below LIA benchmark
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Policies List Preview */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Active Policies (Singapore)</h2>
        <div className="space-y-3">
          <Card className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-[10px]">AIA</Badge>
                <h3 className="font-semibold text-sm">AIA Guaranteed Protect Plus III</h3>
                <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px] border-emerald-500/20">Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Category: Life Insurance • Sum Assured: S$ 500,000
              </p>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 pt-2 sm:pt-0">
              <div className="text-left sm:text-right">
                <span className="text-xs text-muted-foreground block">Premium</span>
                <span className="text-sm font-semibold">S$ 2,400.00 / yr</span>
              </div>
              <Button variant="outline" size="sm">Details</Button>
            </div>
          </Card>

          <Card className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-[10px]">Great Eastern</Badge>
                <h3 className="font-semibold text-sm">GREAT SupremeHealth STANDARD & Rider</h3>
                <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px] border-emerald-500/20">Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Category: Health & Hospital • Claim Limit: S$ 1,000,000
              </p>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 pt-2 sm:pt-0">
              <div className="text-left sm:text-right">
                <span className="text-xs text-muted-foreground block">Premium</span>
                <span className="text-sm font-semibold">S$ 650.00 / yr</span>
              </div>
              <Button variant="outline" size="sm">Details</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

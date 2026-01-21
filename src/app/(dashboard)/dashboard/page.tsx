"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Eye,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  BarChart3,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data for charts
const attentionTrendData = [
  { date: "Jan 1", attention: 65, benchmark: 60 },
  { date: "Jan 8", attention: 72, benchmark: 60 },
  { date: "Jan 15", attention: 68, benchmark: 61 },
  { date: "Jan 22", attention: 78, benchmark: 62 },
  { date: "Jan 29", attention: 82, benchmark: 62 },
  { date: "Feb 5", attention: 76, benchmark: 63 },
  { date: "Feb 12", attention: 85, benchmark: 63 },
];

const channelData = [
  { name: "Display", value: 35, color: "#3B82F6" },
  { name: "Video", value: 28, color: "#10B981" },
  { name: "Social", value: 22, color: "#8B5CF6" },
  { name: "Native", value: 15, color: "#F59E0B" },
];

const campaignPerformance = [
  { name: "Summer Sale", attention: 85, views: 245000 },
  { name: "Brand Awareness", attention: 72, views: 189000 },
  { name: "Product Launch", attention: 91, views: 312000 },
  { name: "Holiday Promo", attention: 68, views: 156000 },
  { name: "Retargeting", attention: 78, views: 198000 },
];

const recentCampaigns = [
  { id: 1, name: "Q1 Brand Campaign", status: "Active", attention: 82, change: 5.2 },
  { id: 2, name: "Product Launch - Series X", status: "Active", attention: 91, change: 12.8 },
  { id: 3, name: "Holiday Remarketing", status: "Paused", attention: 68, change: -2.3 },
  { id: 4, name: "Social Engagement", status: "Active", attention: 75, change: 3.1 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Dashboard"
        subtitle="Welcome back! Here's an overview of your attention metrics."
      />

      <main className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg. Attention Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">78.4%</p>
                  <div className="flex items-center mt-2 text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+12.5% vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg. View Time</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">2.4s</p>
                  <div className="flex items-center mt-2 text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+0.3s vs benchmark</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Campaigns</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                  <div className="flex items-center mt-2 text-gray-500 text-sm">
                    <Target className="h-4 w-4 mr-1" />
                    <span>3 pending review</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Impressions</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">4.2M</p>
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span>-3.2% vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Attention Trend Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Attention Trend</CardTitle>
              <CardDescription>Your attention rate vs. industry benchmark</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attentionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="attention"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.2}
                      strokeWidth={2}
                      name="Your Attention %"
                    />
                    <Area
                      type="monotone"
                      dataKey="benchmark"
                      stroke="#9CA3AF"
                      fill="#9CA3AF"
                      fillOpacity={0.1}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Benchmark %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Channel Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Channel Distribution</CardTitle>
              <CardDescription>Attention by channel type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {channelData.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <div
                      className="h-3 w-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Attention scores by campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaignPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis type="number" domain={[0, 100]} stroke="#6B7280" fontSize={12} />
                    <YAxis dataKey="name" type="category" width={100} stroke="#6B7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="attention" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Attention %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Campaigns List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>Your latest campaign performance</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <p className="font-medium text-gray-900">{campaign.name}</p>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            campaign.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <span className="mr-4">Attention: {campaign.attention}%</span>
                        <span
                          className={`flex items-center ${
                            campaign.change > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {campaign.change > 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {campaign.change > 0 ? "+" : ""}
                          {campaign.change}%
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

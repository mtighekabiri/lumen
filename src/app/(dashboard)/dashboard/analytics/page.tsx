"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter, Calendar } from "lucide-react";
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
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

// Extended analytics data
const dailyAttentionData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  attention: 60 + Math.random() * 30,
  viewTime: 1.5 + Math.random() * 2,
  impressions: 100000 + Math.random() * 150000,
}));

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  attention: 50 + Math.sin(i / 4) * 20 + Math.random() * 10,
  engagement: 40 + Math.cos(i / 4) * 15 + Math.random() * 10,
}));

const deviceData = [
  { device: "Mobile", attention: 72, viewTime: 1.8, share: 55 },
  { device: "Desktop", attention: 85, viewTime: 3.2, share: 30 },
  { device: "Tablet", attention: 78, viewTime: 2.5, share: 10 },
  { device: "CTV", attention: 92, viewTime: 8.5, share: 5 },
];

const heatmapData = [
  { x: 10, y: 20, z: 200 },
  { x: 30, y: 40, z: 300 },
  { x: 50, y: 60, z: 100 },
  { x: 70, y: 80, z: 400 },
  { x: 90, y: 30, z: 250 },
  { x: 20, y: 70, z: 350 },
  { x: 60, y: 50, z: 280 },
];

const demographicData = [
  { age: "18-24", male: 68, female: 72 },
  { age: "25-34", male: 75, female: 78 },
  { age: "35-44", male: 82, female: 80 },
  { age: "45-54", male: 79, female: 76 },
  { age: "55-64", male: 71, female: 74 },
  { age: "65+", male: 65, female: 68 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Analytics"
        subtitle="Deep dive into your attention metrics and performance data"
      />

      <main className="p-6 space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 Days
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Daily Attention Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Attention Metrics</CardTitle>
            <CardDescription>Attention rate and view time over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyAttentionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#6B7280" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="attention"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={false}
                    name="Attention %"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="viewTime"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={false}
                    name="View Time (s)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Two column charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hourly Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Hourly Performance</CardTitle>
              <CardDescription>Attention and engagement by hour of day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="hour" stroke="#6B7280" fontSize={10} interval={2} />
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
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.4}
                      name="Attention %"
                    />
                    <Area
                      type="monotone"
                      dataKey="engagement"
                      stackId="2"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.4}
                      name="Engagement %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Device Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Device Performance</CardTitle>
              <CardDescription>Attention metrics by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deviceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="device" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="attention" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Attention %" />
                    <Bar dataKey="viewTime" fill="#10B981" radius={[4, 4, 0, 0]} name="View Time (s)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Demographic Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Demographic Analysis</CardTitle>
            <CardDescription>Attention rates by age group and gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demographicData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="age" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} domain={[50, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="male" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Male" />
                  <Bar dataKey="female" fill="#EC4899" radius={[4, 4, 0, 0]} name="Female" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Attention Heatmap Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Attention Heatmap Analysis</CardTitle>
            <CardDescription>Visual representation of where users focus on your creatives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" dataKey="x" name="X Position" unit="%" stroke="#6B7280" />
                  <YAxis type="number" dataKey="y" name="Y Position" unit="%" stroke="#6B7280" />
                  <ZAxis type="number" dataKey="z" range={[100, 500]} name="Attention Intensity" />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Scatter name="Attention Points" data={heatmapData} fill="#3B82F6" fillOpacity={0.6} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Bubble size indicates attention intensity. Larger bubbles = more attention focus.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

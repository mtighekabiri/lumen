"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  TrendingUp,
  TrendingDown,
  ExternalLink,
} from "lucide-react";

interface Campaign {
  id: number;
  name: string;
  status: "Active" | "Paused" | "Draft" | "Completed";
  channel: string;
  attention: number;
  viewTime: number;
  impressions: number;
  change: number;
  startDate: string;
  endDate: string;
}

const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Q1 Brand Awareness Campaign",
    status: "Active",
    channel: "Display",
    attention: 82,
    viewTime: 2.4,
    impressions: 1250000,
    change: 5.2,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
  },
  {
    id: 2,
    name: "Product Launch - Series X",
    status: "Active",
    channel: "Video",
    attention: 91,
    viewTime: 4.8,
    impressions: 890000,
    change: 12.8,
    startDate: "2024-02-15",
    endDate: "2024-04-15",
  },
  {
    id: 3,
    name: "Holiday Remarketing",
    status: "Paused",
    channel: "Social",
    attention: 68,
    viewTime: 1.9,
    impressions: 2100000,
    change: -2.3,
    startDate: "2023-11-15",
    endDate: "2024-01-05",
  },
  {
    id: 4,
    name: "Social Engagement Q1",
    status: "Active",
    channel: "Social",
    attention: 75,
    viewTime: 2.1,
    impressions: 560000,
    change: 3.1,
    startDate: "2024-01-15",
    endDate: "2024-03-15",
  },
  {
    id: 5,
    name: "Native Content Series",
    status: "Draft",
    channel: "Native",
    attention: 0,
    viewTime: 0,
    impressions: 0,
    change: 0,
    startDate: "2024-04-01",
    endDate: "2024-06-30",
  },
  {
    id: 6,
    name: "Summer Sale Promo",
    status: "Completed",
    channel: "Display",
    attention: 79,
    viewTime: 2.2,
    impressions: 3200000,
    change: 8.5,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
  },
  {
    id: 7,
    name: "CTV Brand Spot",
    status: "Active",
    channel: "CTV",
    attention: 94,
    viewTime: 12.5,
    impressions: 450000,
    change: 15.2,
    startDate: "2024-02-01",
    endDate: "2024-05-31",
  },
];

const getStatusColor = (status: Campaign["status"]) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700";
    case "Paused":
      return "bg-yellow-100 text-yellow-700";
    case "Draft":
      return "bg-gray-100 text-gray-700";
    case "Completed":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedCampaigns.length === filteredCampaigns.length) {
      setSelectedCampaigns([]);
    } else {
      setSelectedCampaigns(filteredCampaigns.map((c) => c.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedCampaigns((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Campaigns"
        subtitle="Manage and monitor your advertising campaigns"
      />

      <main className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total Campaigns</p>
              <p className="text-2xl font-bold">{campaigns.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {campaigns.filter((c) => c.status === "Active").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Avg. Attention</p>
              <p className="text-2xl font-bold text-blue-600">
                {(
                  campaigns
                    .filter((c) => c.attention > 0)
                    .reduce((acc, c) => acc + c.attention, 0) /
                  campaigns.filter((c) => c.attention > 0).length
                ).toFixed(1)}
                %
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total Impressions</p>
              <p className="text-2xl font-bold">
                {formatNumber(campaigns.reduce((acc, c) => acc + c.impressions, 0))}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>All Campaigns</CardTitle>
                <CardDescription>
                  {filteredCampaigns.length} campaigns found
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search campaigns..."
                    className="pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedCampaigns.length === filteredCampaigns.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Campaign
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Channel
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Attention
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      View Time
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Impressions
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Change
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedCampaigns.includes(campaign.id)}
                          onChange={() => toggleSelect(campaign.id)}
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{campaign.name}</p>
                          <p className="text-sm text-gray-500">
                            {campaign.startDate} - {campaign.endDate}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            campaign.status
                          )}`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{campaign.channel}</td>
                      <td className="py-4 px-4">
                        {campaign.attention > 0 ? (
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${campaign.attention}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{campaign.attention}%</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {campaign.viewTime > 0 ? `${campaign.viewTime}s` : "-"}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {campaign.impressions > 0
                          ? formatNumber(campaign.impressions)
                          : "-"}
                      </td>
                      <td className="py-4 px-4">
                        {campaign.change !== 0 ? (
                          <span
                            className={`flex items-center text-sm ${
                              campaign.change > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {campaign.change > 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            {campaign.change > 0 ? "+" : ""}
                            {campaign.change}%
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            title="View details"
                          >
                            <Eye className="h-4 w-4 text-gray-500" />
                          </button>
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4 text-gray-500" />
                          </button>
                          {campaign.status === "Active" ? (
                            <button
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Pause"
                            >
                              <Pause className="h-4 w-4 text-gray-500" />
                            </button>
                          ) : campaign.status === "Paused" ? (
                            <button
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Resume"
                            >
                              <Play className="h-4 w-4 text-gray-500" />
                            </button>
                          ) : null}
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            title="More options"
                          >
                            <MoreHorizontal className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Showing {filteredCampaigns.length} of {campaigns.length} campaigns
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

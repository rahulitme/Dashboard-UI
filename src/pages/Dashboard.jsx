import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MoreHorizontal, 
  ArrowUpDown, 
  ChevronDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  CreditCard 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Sample data that matches the screenshot
const DUMMY_DATA = [
  {
    id: "ORD001",
    customer: "John Smith",
    status: "Completed",
    date: "2023-05-15",
    total: 125.99,
  },
  {
    id: "ORD002",
    customer: "Sarah Johnson",
    status: "Processing",
    date: "2023-05-14",
    total: 243.50,
  },
  {
    id: "ORD003",
    customer: "Michael Brown",
    status: "Pending",
    date: "2023-05-13",
    total: 89.99,
  },
  {
    id: "ORD004",
    customer: "Emma Wilson",
    status: "Completed",
    date: "2023-05-12",
    total: 177.25,
  },
  {
    id: "ORD005",
    customer: "David Lee",
    status: "Completed",
    date: "2023-05-11",
    total: 132.00,
  },
  {
    id: "ORD006",
    customer: "Jennifer Garcia",
    status: "Cancelled",
    date: "2023-05-10",
    total: 65.75,
  },
  {
    id: "ORD007",
    customer: "Robert Martinez",
    status: "Processing",
    date: "2023-05-09",
    total: 321.49,
  },
  {
    id: "ORD008",
    customer: "Lisa Taylor",
    status: "Pending",
    date: "2023-05-08",
    total: 98.50,
  },
];

const statusColors = {
  Completed: "bg-green-100 text-green-800",
  Processing: "bg-blue-100 text-blue-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setOrders(DUMMY_DATA);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedOrders = orders
    .filter((order) => {
      return (
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortField === "total") {
        return sortDirection === "asc" ? a.total - b.total : b.total - a.total;
      } else if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else {
        return sortDirection === "asc"
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      }
    });

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Overview of your store performance</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="$45,231.89"
          description="+20.1% from last month"
          icon={<DollarSign className="h-4 w-4 text-white" />}
          iconClassName="bg-blue-500"
          isLoading={isLoading}
        />
        <StatsCard
          title="Customers"
          value="2,350"
          description="+5.2% from last month"
          icon={<Users className="h-4 w-4 text-white" />}
          iconClassName="bg-green-500"
          isLoading={isLoading}
        />
        <StatsCard
          title="Orders"
          value="1,247"
          description="+12.5% from last month"
          icon={<ShoppingCart className="h-4 w-4 text-white" />}
          iconClassName="bg-purple-500"
          isLoading={isLoading}
        />
        <StatsCard
          title="Avg. Order Value"
          value="$36.25"
          description="+2.3% from last month"
          icon={<CreditCard className="h-4 w-4 text-white" />}
          iconClassName="bg-orange-500"
          isLoading={isLoading}
        />
      </div>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            A list of your recent orders and their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Status <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>Completed</DropdownMenuItem>
                  <DropdownMenuItem>Processing</DropdownMenuItem>
                  <DropdownMenuItem>Pending</DropdownMenuItem>
                  <DropdownMenuItem>Cancelled</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="w-[100px] cursor-pointer"
                      onClick={() => handleSort("id")}
                    >
                      Order ID
                      {sortField === "id" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("customer")}
                    >
                      Customer
                      {sortField === "customer" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      Status
                      {sortField === "status" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("date")}
                    >
                      Date
                      {sortField === "date" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      className="text-right cursor-pointer"
                      onClick={() => handleSort("total")}
                    >
                      Amount
                      {sortField === "total" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedOrders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-24 text-center text-gray-500"
                      >
                        No orders found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAndSortedOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusColors[order.status]}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(order.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          ${order.total.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Update status</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                Cancel order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({ title, value, description, icon, iconClassName, isLoading }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mt-1" />
            ) : (
              <h3 className="text-2xl font-bold tracking-tight mt-1">{value}</h3>
            )}
            {isLoading ? (
              <Skeleton className="h-4 w-32 mt-1" />
            ) : (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <div className={`p-2 rounded-md ${iconClassName}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// File: src/pages/Analytics.jsx

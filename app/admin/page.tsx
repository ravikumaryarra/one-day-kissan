"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Search,
  Filter,
  Download,
  Plus,
  Phone,
  MessageCircle,
  QrCode,
  Calendar,
  Users,
  IndianRupee,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Trash2,
  LogOut,
  RefreshCw,
  Building2,
  GraduationCap,
  Sparkles,
  Printer,
  X,
  FileSpreadsheet
} from "lucide-react";
import type { BookingRecord } from "@/components/BookingModal";

// Initial demo baseline records for farm operations
const SEED_BOOKINGS: BookingRecord[] = [
  {
    id: "seed-1",
    reference: "ODK-2026-BH-1042",
    createdAt: "2026-11-14T09:30:00.000Z",
    visitType: "School",
    farm: "Bhongir",
    customerName: "Mrs. Shalini Rao (Principal)",
    orgName: "Oakridge International School, Gachibowli",
    phone: "9849012345",
    email: "shalini.rao@oakridge.in",
    headcount: 140,
    visitDate: "2026-11-22",
    tokenPaid: 2500,
    totalEstimated: 63000,
    balanceDue: 60500,
    paymentMethod: "UPI_Online",
    status: "Confirmed",
    notes: "Grade 6 & 7 agriculture & pottery study tour. 3 school buses arriving at 9:30 AM."
  },
  {
    id: "seed-2",
    reference: "ODK-2026-MO-2190",
    createdAt: "2026-11-15T11:15:00.000Z",
    visitType: "Corporate",
    farm: "Moinabad",
    customerName: "Vikramaditya Varma",
    orgName: "Infosys Hyderabad CSR & Team",
    phone: "9988776655",
    email: "vikram.v@infosys.com",
    headcount: 65,
    visitDate: "2026-11-25",
    tokenPaid: 5000,
    totalEstimated: 61750,
    balanceDue: 56750,
    paymentMethod: "UPI_Online",
    status: "Confirmed",
    notes: "Corporate rural day-out, bullock cart rides & organic farm-to-table lunch requested."
  },
  {
    id: "seed-3",
    reference: "ODK-2026-BH-3814",
    createdAt: "2026-11-15T16:40:00.000Z",
    visitType: "Family",
    farm: "Bhongir",
    customerName: "Dr. Haritha Reddy",
    orgName: "Family Weekend Group",
    phone: "9123456780",
    email: "haritha.reddy@gmail.com",
    headcount: 12,
    visitDate: "2026-11-29",
    tokenPaid: 500,
    totalEstimated: 9000,
    balanceDue: 8500,
    paymentMethod: "UPI_Online",
    status: "New",
    notes: "Grandparents and 4 kids. Inquired about clay pottery and tractor rides."
  },
  {
    id: "seed-4",
    reference: "ODK-2026-BH-4028",
    createdAt: "2026-11-16T08:10:00.000Z",
    visitType: "School",
    farm: "Bhongir",
    customerName: "Mr. Venkat Raman (Admin Head)",
    orgName: "Delhi Public School (DPS Hyderabad)",
    phone: "9701122334",
    email: "admin@dpshyderabad.in",
    headcount: 220,
    visitDate: "2026-12-05",
    tokenPaid: 2500,
    totalEstimated: 99000,
    balanceDue: 96500,
    paymentMethod: "UPI_Online",
    status: "Contacted",
    notes: "Primary school excursion. In discussion for customized agricultural science workshop."
  },
  {
    id: "seed-5",
    reference: "ODK-2026-MO-5112",
    createdAt: "2026-11-10T14:20:00.000Z",
    visitType: "Corporate",
    farm: "Moinabad",
    customerName: "Sanjay Kumar",
    orgName: "Hyderabad Weekend Trekkers Club",
    phone: "9866112244",
    email: "sanjay@trekkershyd.org",
    headcount: 25,
    visitDate: "2026-11-12",
    tokenPaid: 5000,
    totalEstimated: 23750,
    balanceDue: 0,
    paymentMethod: "UPI_Online",
    status: "Completed",
    notes: "Successfully completed. Gate check-in done at 8:45 AM. Five-star feedback received."
  }
];

const DEFAULT_ADMIN_PIN = "kissan2026";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"bookings" | "scanner" | "analytics">("bookings");
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFarm, setSelectedFarm] = useState<"All" | "Bhongir" | "Moinabad">("All");
  const [selectedType, setSelectedType] = useState<"All" | "School" | "Corporate" | "Family">("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Scanner state
  const [scanCodeInput, setScanCodeInput] = useState("");
  const [scannedResult, setScannedResult] = useState<BookingRecord | null>(null);
  const [scanError, setScanError] = useState("");
  const [checkInSuccess, setCheckInSuccess] = useState(false);

  // Selected pass for modal view
  const [viewingPass, setViewingPass] = useState<BookingRecord | null>(null);

  // New manual booking modal
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualForm, setManualForm] = useState({
    customerName: "",
    orgName: "",
    phone: "",
    email: "",
    visitType: "School" as "School" | "Corporate" | "Family",
    farm: "Bhongir" as "Bhongir" | "Moinabad",
    headcount: "50",
    visitDate: "",
    tokenPaid: "2500",
    notes: ""
  });

  // Client-side hydration & session authentication check
  useEffect(() => {
    setIsMounted(true);
    const sessionAuth = sessionStorage.getItem("odk_admin_authenticated");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }

    // Load bookings from localStorage
    try {
      const stored = localStorage.getItem("odk_staff_bookings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBookings(parsed);
          return;
        }
      }
      // If nothing found, seed with initial realistic records
      setBookings(SEED_BOOKINGS);
      localStorage.setItem("odk_staff_bookings", JSON.stringify(SEED_BOOKINGS));
    } catch {
      setBookings(SEED_BOOKINGS);
    }
  }, []);

  // Save bookings to localStorage whenever they change
  const saveBookings = (updated: BookingRecord[]) => {
    setBookings(updated);
    try {
      localStorage.setItem("odk_staff_bookings", JSON.stringify(updated));
    } catch (e) {
      console.error("Storage error:", e);
    }
  };

  // PIN Unlock
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN || DEFAULT_ADMIN_PIN;
    if (pinInput.trim() === correctPin) {
      setIsAuthenticated(true);
      setPinError(false);
      sessionStorage.setItem("odk_admin_authenticated", "true");
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("odk_admin_authenticated");
    setPinInput("");
  };

  // Status change handler
  const handleStatusChange = (reference: string, newStatus: BookingRecord["status"]) => {
    const updated = bookings.map((b) => (b.reference === reference ? { ...b, status: newStatus } : b));
    saveBookings(updated);
    if (scannedResult && scannedResult.reference === reference) {
      setScannedResult({ ...scannedResult, status: newStatus });
    }
  };

  // Delete booking handler
  const handleDeleteBooking = (reference: string) => {
    if (window.confirm(`Are you sure you want to remove booking ${reference}?`)) {
      const updated = bookings.filter((b) => b.reference !== reference);
      saveBookings(updated);
      if (viewingPass?.reference === reference) setViewingPass(null);
      if (scannedResult?.reference === reference) setScannedResult(null);
    }
  };

  // Scanner check
  const handleScanLookup = (refCode?: string) => {
    const query = (refCode || scanCodeInput).trim().toUpperCase();
    if (!query) {
      setScanError("Please enter a ticket reference ID");
      return;
    }
    const found = bookings.find((b) => b.reference.toUpperCase() === query);
    if (found) {
      setScannedResult(found);
      setScanError("");
      setCheckInSuccess(false);
    } else {
      setScannedResult(null);
      setScanError(`No ticket pass found matching "${query}". Please check the ID on the customer's pass.`);
    }
  };

  const handleConfirmGateCheckIn = (booking: BookingRecord) => {
    const timestamp = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    const updated = bookings.map((b) =>
      b.reference === booking.reference
        ? {
            ...b,
            status: "Completed" as const,
            balanceDue: 0,
            notes: (b.notes ? b.notes + " | " : "") + `Gate Entry Confirmed at ${timestamp}`
          }
        : b
    );
    saveBookings(updated);
    setScannedResult({
      ...booking,
      status: "Completed",
      balanceDue: 0,
      notes: (booking.notes ? booking.notes + " | " : "") + `Gate Entry Confirmed at ${timestamp}`
    });
    setCheckInSuccess(true);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "Reference ID",
      "Date Created",
      "Visit Date",
      "Farm Campus",
      "Visit Type",
      "Customer Name",
      "Organization",
      "Phone",
      "Email",
      "Headcount",
      "Token Paid (INR)",
      "Total Estimated (INR)",
      "Balance Due (INR)",
      "Payment Mode",
      "Status",
      "Staff Notes"
    ];

    const rows = bookings.map((b) => [
      `"${b.reference}"`,
      `"${new Date(b.createdAt).toLocaleDateString("en-IN")}"`,
      `"${b.visitDate}"`,
      `"${b.farm}"`,
      `"${b.visitType}"`,
      `"${b.customerName}"`,
      `"${b.orgName || ""}"`,
      `"${b.phone}"`,
      `"${b.email || ""}"`,
      b.headcount,
      b.tokenPaid,
      b.totalEstimated,
      b.balanceDue,
      `"${b.paymentMethod}"`,
      `"${b.status}"`,
      `"${(b.notes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `onedaykissan_bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add Manual Booking submit
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(manualForm.headcount, 10) || 1;
    const token = parseInt(manualForm.tokenPaid, 10) || 0;
    const rateMap = { School: 450, Corporate: 950, Family: 750 };
    const total = count * rateMap[manualForm.visitType];
    const prefix = manualForm.farm === "Bhongir" ? "BH" : "MO";
    const ref = `ODK-2026-${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRec: BookingRecord = {
      id: `manual-${Date.now()}`,
      reference: ref,
      createdAt: new Date().toISOString(),
      visitType: manualForm.visitType,
      farm: manualForm.farm,
      customerName: manualForm.customerName,
      orgName: manualForm.orgName,
      phone: manualForm.phone,
      email: manualForm.email,
      headcount: count,
      visitDate: manualForm.visitDate || new Date().toISOString().slice(0, 10),
      tokenPaid: token,
      totalEstimated: total,
      balanceDue: Math.max(0, total - token),
      paymentMethod: "UPI_Online",
      status: "Confirmed",
      notes: manualForm.notes || "Added manually by staff via Operations Portal."
    };

    const updated = [newRec, ...bookings];
    saveBookings(updated);
    setIsManualModalOpen(false);
    setManualForm({
      customerName: "",
      orgName: "",
      phone: "",
      email: "",
      visitType: "School",
      farm: "Bhongir",
      headcount: "50",
      visitDate: "",
      tokenPaid: "2500",
      notes: ""
    });
  };

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Farm filter
      if (selectedFarm !== "All" && b.farm !== selectedFarm) return false;
      // Type filter
      if (selectedType !== "All" && b.visitType !== selectedType) return false;
      // Status filter
      if (selectedStatus !== "All" && b.status !== selectedStatus) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = b.customerName?.toLowerCase().includes(q);
        const matchOrg = b.orgName?.toLowerCase().includes(q);
        const matchPhone = b.phone?.includes(q);
        const matchRef = b.reference?.toLowerCase().includes(q);
        if (!matchName && !matchOrg && !matchPhone && !matchRef) return false;
      }
      return true;
    });
  }, [bookings, selectedFarm, selectedType, selectedStatus, searchQuery]);

  // KPI Metrics calculation
  const metrics = useMemo(() => {
    const totalBookings = bookings.length;
    const totalHeadcount = bookings.reduce((sum, b) => sum + (b.headcount || 0), 0);
    const totalTokensCollected = bookings.reduce((sum, b) => sum + (b.tokenPaid || 0), 0);
    const totalBalancePending = bookings.reduce((sum, b) => sum + (b.balanceDue || 0), 0);
    const confirmedCount = bookings.filter((b) => b.status === "Confirmed" || b.status === "Completed").length;

    return {
      totalBookings,
      totalHeadcount,
      totalTokensCollected,
      totalBalancePending,
      confirmedCount
    };
  }, [bookings]);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-6">
        <div className="flex items-center gap-3 text-stone-600">
          <RefreshCw className="w-6 h-6 animate-spin text-[#2b4c1c]" />
          <span className="font-medium">Loading Operations Portal...</span>
        </div>
      </div>
    );
  }

  // ==========================================
  // 1. PIN AUTHENTICATION GATE SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1b3012] via-[#243f18] to-[#121f0c] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
          <div className="bg-[#2b4c1c] text-white p-8 text-center relative">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
              <ShieldCheck className="w-9 h-9 text-[#84cc16]" />
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-tight">One Day Kissan</h1>
            <p className="text-white/80 text-xs uppercase tracking-widest mt-1 font-semibold">
              Farm Operations & Gate Pass Portal
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                Staff Security Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  autoFocus
                  placeholder="Enter Passcode..."
                  className={`w-full px-4 py-3.5 pl-11 bg-stone-50 border rounded-xl text-stone-900 font-mono tracking-widest text-lg focus:outline-none focus:ring-2 transition-all ${
                    pinError
                      ? "border-red-500 focus:ring-red-200 bg-red-50/50"
                      : "border-stone-200 focus:ring-[#2b4c1c]/20 focus:border-[#2b4c1c]"
                  }`}
                />
                <Lock className="w-5 h-5 text-stone-400 absolute left-3.5 top-4" />
              </div>

              {pinError && (
                <p className="text-xs text-red-600 font-semibold mt-2 flex items-center gap-1.5 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Incorrect passcode. Please check your staff credentials.
                </p>
              )}

              <div className="mt-3 bg-amber-50 border border-amber-200/80 rounded-lg p-2.5 text-[11px] text-amber-800 flex items-center justify-between">
                <span>Default Demo PIN:</span>
                <button
                  type="button"
                  onClick={() => setPinInput(DEFAULT_ADMIN_PIN)}
                  className="font-mono font-bold bg-amber-200/80 px-2 py-0.5 rounded text-amber-900 hover:bg-amber-300"
                >
                  kissan2026
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2b4c1c] hover:bg-[#1e3614] text-white py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-[#84cc16]" />
              Unlock Operations Portal
            </button>

            <div className="text-center">
              <Link href="/" className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4">
                ← Return to Public Homepage
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. OPERATIONS DASHBOARD MAIN VIEW
  // ==========================================
  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 pb-16">
      {/* Top Operations Header */}
      <header className="bg-[#1b3012] text-white border-b border-white/10 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Brand */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#2b4c1c] rounded-xl flex items-center justify-center border border-white/20 shadow-inner">
                <ShieldCheck className="w-6 h-6 text-[#84cc16]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-xl font-bold tracking-tight text-white">One Day Kissan</h1>
                  <span className="bg-[#84cc16]/20 text-[#84cc16] text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border border-[#84cc16]/30">
                    Operations
                  </span>
                </div>
                <p className="text-stone-300 text-xs">Staff Management & Digital Gate Control</p>
              </div>
            </div>

            {/* Quick Actions & Logout */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setIsManualModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 bg-[#84cc16] hover:bg-[#72b012] text-[#1b3012] px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all shadow"
              >
                <Plus className="w-4 h-4" />
                Add Walk-In / Call
              </button>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all border border-white/15"
                title="Download CSV report"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#84cc16]" />
                <span className="hidden md:inline">Export CSV</span>
              </button>

              <Link
                href="/"
                target="_blank"
                className="hidden md:inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-white px-2 py-1"
              >
                View Website ↗
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-red-950/60 hover:bg-red-900 text-red-200 px-3 py-2 rounded-xl text-xs font-semibold transition-all border border-red-800/40"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-t border-white/10 pt-2 pb-1 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "bookings"
                  ? "bg-white text-[#1b3012] shadow"
                  : "text-stone-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              Bookings & Leads ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab("scanner")}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "scanner"
                  ? "bg-[#84cc16] text-[#1b3012] shadow"
                  : "text-stone-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <QrCode className="w-4 h-4" />
              Gate Check-In Tool
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "analytics"
                  ? "bg-white text-[#1b3012] shadow"
                  : "text-stone-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <MapPin className="w-4 h-4" />
              Campuses & Capacity
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* KPI Metrics Ribbon */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Bookings</span>
              <Users className="w-4 h-4 text-[#2b4c1c]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              {metrics.totalBookings}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Live inquiries in database</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Confirmed Visitors</span>
              <GraduationCap className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              {metrics.totalHeadcount}
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">Students & adults planned</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Advance Tokens</span>
              <IndianRupee className="w-4 h-4 text-[#84cc16]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2b4c1c] font-serif">
              ₹{metrics.totalTokensCollected.toLocaleString("en-IN")}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Secured advance payments</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Balance Due</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-900 font-serif">
              ₹{metrics.totalBalancePending.toLocaleString("en-IN")}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Settled at farm entrance</p>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Passes Ready</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              {metrics.confirmedCount}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Confirmed passes generated</p>
          </div>
        </section>

        {/* ==================================================== */}
        {/* TAB 1: BOOKINGS & LEADS MANAGER */}
        {/* ==================================================== */}
        {activeTab === "bookings" && (
          <section className="space-y-6">
            {/* Filter Toolbar */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by school, visitor name, phone, or ticket ID..."
                    className="w-full px-4 py-2.5 pl-10 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2b4c1c]/20 focus:border-[#2b4c1c]"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-stone-400 hover:text-stone-600 absolute right-3 top-3 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Mobile walk in button */}
                <button
                  onClick={() => setIsManualModalOpen(true)}
                  className="sm:hidden w-full flex items-center justify-center gap-2 bg-[#84cc16] text-[#1b3012] px-4 py-2.5 rounded-xl text-xs font-bold"
                >
                  <Plus className="w-4 h-4" />
                  Add Walk-In / Call
                </button>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-stone-100 text-xs">
                <span className="text-stone-500 font-semibold flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#2b4c1c]" />
                  Filters:
                </span>

                {/* Campus Filter */}
                <div className="flex items-center bg-stone-100 p-1 rounded-lg">
                  {(["All", "Bhongir", "Moinabad"] as const).map((campus) => (
                    <button
                      key={campus}
                      onClick={() => setSelectedFarm(campus)}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                        selectedFarm === campus ? "bg-white text-stone-900 shadow-sm" : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      {campus}
                    </button>
                  ))}
                </div>

                {/* Category Filter */}
                <div className="flex items-center bg-stone-100 p-1 rounded-lg">
                  {(["All", "School", "Corporate", "Family"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedType(cat)}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                        selectedType === cat ? "bg-white text-stone-900 shadow-sm" : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Status Filter */}
                <div className="flex items-center bg-stone-100 p-1 rounded-lg">
                  {(["All", "New", "Contacted", "Confirmed", "Completed", "Cancelled"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStatus(st)}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                        selectedStatus === st ? "bg-white text-stone-900 shadow-sm" : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <span className="text-stone-400 ml-auto font-medium">
                  Showing {filteredBookings.length} of {bookings.length}
                </span>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
              {filteredBookings.length === 0 ? (
                <div className="py-16 text-center text-stone-500">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 text-stone-400" />
                  <p className="font-semibold">No bookings found</p>
                  <p className="text-xs text-stone-400 mt-1">Try resetting the filters or search term.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Ticket / Date</th>
                        <th className="py-3.5 px-4">Visitor & Organization</th>
                        <th className="py-3.5 px-4">Campus & Type</th>
                        <th className="py-3.5 px-4">Headcount</th>
                        <th className="py-3.5 px-4">Tokens & Payment</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredBookings.map((b) => (
                        <tr key={b.id || b.reference} className="hover:bg-stone-50/80 transition-colors">
                          {/* Reference */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="font-mono font-bold text-stone-900 text-xs bg-stone-100 px-2 py-1 rounded border border-stone-200">
                              {b.reference}
                            </span>
                            <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-stone-400" />
                              Visit: <span className="font-semibold text-stone-700">{b.visitDate}</span>
                            </div>
                          </td>

                          {/* Visitor & Org */}
                          <td className="py-4 px-4">
                            <div className="font-bold text-stone-900">{b.customerName}</div>
                            {b.orgName && (
                              <div className="text-stone-600 text-xs flex items-center gap-1 mt-0.5">
                                <Building2 className="w-3 h-3 text-stone-400 shrink-0" />
                                {b.orgName}
                              </div>
                            )}
                            <div className="text-stone-500 text-[11px] mt-1 font-mono">{b.phone}</div>
                          </td>

                          {/* Campus & Type */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                b.farm === "Bhongir"
                                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                                  : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              }`}
                            >
                              {b.farm}
                            </span>
                            <div className="text-stone-600 text-xs font-semibold mt-1 flex items-center gap-1">
                              {b.visitType === "School" && <GraduationCap className="w-3.5 h-3.5 text-blue-600" />}
                              {b.visitType === "Corporate" && <Building2 className="w-3.5 h-3.5 text-purple-600" />}
                              {b.visitType === "Family" && <Users className="w-3.5 h-3.5 text-amber-600" />}
                              {b.visitType}
                            </div>
                          </td>

                          {/* Headcount */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="font-bold text-stone-900 text-base">{b.headcount}</div>
                            <div className="text-[11px] text-stone-500">guests</div>
                          </td>

                          {/* Token & Payment */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="font-bold text-emerald-700">
                              Token: ₹{b.tokenPaid?.toLocaleString("en-IN") || 0}
                            </div>
                            <div className="text-[11px] text-stone-500">
                              Est: ₹{b.totalEstimated?.toLocaleString("en-IN") || 0}
                            </div>
                            {b.balanceDue > 0 ? (
                              <div className="text-[11px] text-amber-800 font-semibold">
                                Gate Bal: ₹{b.balanceDue?.toLocaleString("en-IN")}
                              </div>
                            ) : (
                              <div className="text-[10px] text-emerald-600 font-bold uppercase">Paid Full</div>
                            )}
                          </td>

                          {/* Status Dropdown */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <select
                              value={b.status}
                              onChange={(e) =>
                                handleStatusChange(b.reference, e.target.value as BookingRecord["status"])
                              }
                              className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                                b.status === "Confirmed"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                  : b.status === "Completed"
                                  ? "bg-blue-50 text-blue-800 border-blue-300"
                                  : b.status === "New"
                                  ? "bg-amber-50 text-amber-800 border-amber-300"
                                  : b.status === "Contacted"
                                  ? "bg-purple-50 text-purple-800 border-purple-300"
                                  : "bg-red-50 text-red-800 border-red-300"
                              }`}
                            >
                              <option value="New">New Lead</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed / Gate Admitted</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          {/* Action Buttons */}
                          <td className="py-4 px-4 whitespace-nowrap text-right space-x-1.5">
                            {/* WhatsApp Button */}
                            <a
                              href={`https://wa.me/91${b.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Namaste ${b.customerName}, Greetings from One Day Kissan (${b.farm} Campus)! Your visit pass ${b.reference} for ${b.headcount} guests on ${b.visitDate} is recorded. How can our farm team assist you?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>

                            {/* Call Button */}
                            <a
                              href={`tel:${b.phone}`}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                              title="Call visitor"
                            >
                              <Phone className="w-4 h-4" />
                            </a>

                            {/* View Gate Pass */}
                            <button
                              onClick={() => setViewingPass(b)}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#2b4c1c]/10 hover:bg-[#2b4c1c]/20 text-[#2b4c1c] transition-colors"
                              title="View Gate Pass"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteBooking(b.reference)}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ==================================================== */}
        {/* TAB 2: GATE SCANNER & CHECK-IN TOOL */}
        {/* ==================================================== */}
        {activeTab === "scanner" && (
          <section className="max-w-3xl mx-auto space-y-6">
            {/* Scanner Input Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-md">
              <div className="text-center max-w-lg mx-auto mb-6">
                <div className="w-14 h-14 bg-[#2b4c1c]/10 text-[#2b4c1c] rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <QrCode className="w-7 h-7" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">Farm Gate Check-In & Scanner</h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Scan the QR code or enter the Reference Pass ID printed on the visitor&apos;s digital ticket pass.
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={scanCodeInput}
                  onChange={(e) => {
                    setScanCodeInput(e.target.value);
                    setScanError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleScanLookup()}
                  placeholder="e.g. ODK-2026-BH-1042"
                  className="flex-1 px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl font-mono text-stone-900 text-base uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#2b4c1c]/20 focus:border-[#2b4c1c]"
                />
                <button
                  onClick={() => handleScanLookup()}
                  className="bg-[#2b4c1c] hover:bg-[#1e3614] text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow"
                >
                  Verify Pass
                </button>
              </div>

              {scanError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {scanError}
                </div>
              )}

              {/* Quick simulation pills */}
              <div className="mt-6 pt-4 border-t border-stone-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Quick-Test Scheduled Passes Today:
                </p>
                <div className="flex flex-wrap gap-2">
                  {bookings.slice(0, 4).map((b) => (
                    <button
                      key={b.reference}
                      onClick={() => {
                        setScanCodeInput(b.reference);
                        handleScanLookup(b.reference);
                      }}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-mono font-semibold transition-all"
                    >
                      {b.reference} ({b.customerName.split(" ")[0]})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Scanned Result Card */}
            {scannedResult && (
              <div
                className={`p-6 sm:p-8 rounded-3xl border shadow-lg transition-all ${
                  checkInSuccess
                    ? "bg-emerald-50 border-emerald-300"
                    : scannedResult.status === "Completed"
                    ? "bg-blue-50/50 border-blue-200"
                    : "bg-white border-stone-200"
                }`}
              >
                <div className="flex items-start justify-between pb-4 border-b border-stone-200/60 mb-6">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        checkInSuccess || scannedResult.status === "Completed"
                          ? "bg-emerald-600 text-white"
                          : "bg-[#2b4c1c] text-white"
                      }`}
                    >
                      {checkInSuccess || scannedResult.status === "Completed"
                        ? "✓ Verified & Admitted"
                        : "● Valid Pass — Ready for Gate Entry"}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mt-2 font-mono">
                      {scannedResult.reference}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-stone-500">Campus</span>
                    <p className="font-bold text-stone-900 text-lg">{scannedResult.farm}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="bg-white/80 p-4 rounded-xl border border-stone-200/60">
                    <span className="text-xs text-stone-500 font-semibold">Primary Contact</span>
                    <p className="font-bold text-stone-900 mt-1">{scannedResult.customerName}</p>
                    {scannedResult.orgName && (
                      <p className="text-xs text-stone-600 mt-0.5">{scannedResult.orgName}</p>
                    )}
                    <p className="text-xs font-mono text-stone-500 mt-1">{scannedResult.phone}</p>
                  </div>

                  <div className="bg-white/80 p-4 rounded-xl border border-stone-200/60">
                    <span className="text-xs text-stone-500 font-semibold">Guest Headcount</span>
                    <p className="font-extrabold text-[#2b4c1c] text-2xl mt-1">
                      {scannedResult.headcount} Guests
                    </p>
                    <p className="text-xs text-stone-600">Category: {scannedResult.visitType} Pass</p>
                  </div>
                </div>

                {/* Financial check */}
                <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                        Gate Settlement Due:
                      </span>
                      <p className="text-xs text-amber-700 mt-0.5">
                        Token Paid: ₹{scannedResult.tokenPaid.toLocaleString("en-IN")} of Total Est. ₹
                        {scannedResult.totalEstimated.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-2xl font-extrabold text-amber-900">
                        {scannedResult.balanceDue > 0
                          ? `₹${scannedResult.balanceDue.toLocaleString("en-IN")}`
                          : "₹0 (Cleared)"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confirm Gate Check-in Button */}
                {scannedResult.status !== "Completed" && (
                  <button
                    onClick={() => handleConfirmGateCheckIn(scannedResult)}
                    className="w-full bg-[#2b4c1c] hover:bg-[#1e3614] text-white py-4 rounded-2xl font-bold tracking-wide text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#84cc16]" />
                    Confirm Gate Check-In & Mark Entry
                  </button>
                )}

                {checkInSuccess && (
                  <div className="p-4 bg-emerald-100/90 text-emerald-900 rounded-2xl text-center font-bold text-sm flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                    Guest has been checked in! Operations logs updated.
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* ==================================================== */}
        {/* TAB 3: CAMPUSES & CAPACITY */}
        {/* ==================================================== */}
        {activeTab === "analytics" && (
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bhongir Campus Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
                      Campus 01
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mt-2">Bhongir Farm</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-500">Capacity</span>
                    <p className="font-bold text-stone-900">500 Visitors / Day</p>
                  </div>
                </div>

                <p className="text-xs text-stone-600 mb-6">
                  Near Historic Bhongir Fort (54 km from Uppal, Hyderabad). Features natural clay pottery, water streams,
                  tractor rides, and rural games.
                </p>

                <div className="space-y-3 pt-4 border-t border-stone-100 text-xs">
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">Active Bookings:</span>
                    <span className="font-bold text-stone-900">
                      {bookings.filter((b) => b.farm === "Bhongir").length} tours
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">Total Booked Headcount:</span>
                    <span className="font-bold text-stone-900">
                      {bookings
                        .filter((b) => b.farm === "Bhongir")
                        .reduce((acc, b) => acc + b.headcount, 0)}{" "}
                      guests
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-stone-500">Tokens Collected:</span>
                    <span className="font-bold text-[#2b4c1c]">
                      ₹
                      {bookings
                        .filter((b) => b.farm === "Bhongir")
                        .reduce((acc, b) => acc + b.tokenPaid, 0)
                        .toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-semibold">Campus Gate Manager:</span>
                  <a
                    href="tel:919000000000"
                    className="text-[#2b4c1c] font-bold flex items-center gap-1 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    +91 91234 56789
                  </a>
                </div>
              </div>

              {/* Moinabad Campus Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                      Campus 02
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mt-2">Moinabad Farm</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-500">Capacity</span>
                    <p className="font-bold text-stone-900">350 Visitors / Day</p>
                  </div>
                </div>

                <p className="text-xs text-stone-600 mb-6">
                  Chevella Road, Moinabad (28 km from Gachibowli, Hyderabad). Features lush organic orchards, indigenous
                  cow goshala, bullock cart rides, and corporate team day outs.
                </p>

                <div className="space-y-3 pt-4 border-t border-stone-100 text-xs">
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">Active Bookings:</span>
                    <span className="font-bold text-stone-900">
                      {bookings.filter((b) => b.farm === "Moinabad").length} tours
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">Total Booked Headcount:</span>
                    <span className="font-bold text-stone-900">
                      {bookings
                        .filter((b) => b.farm === "Moinabad")
                        .reduce((acc, b) => acc + b.headcount, 0)}{" "}
                      guests
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-stone-500">Tokens Collected:</span>
                    <span className="font-bold text-[#2b4c1c]">
                      ₹
                      {bookings
                        .filter((b) => b.farm === "Moinabad")
                        .reduce((acc, b) => acc + b.tokenPaid, 0)
                        .toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-semibold">Campus Gate Manager:</span>
                  <a
                    href="tel:919000000000"
                    className="text-[#2b4c1c] font-bold flex items-center gap-1 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ==================================================== */}
      {/* MODAL: DIGITAL GATE PASS VIEW */}
      {/* ==================================================== */}
      {viewingPass && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200">
            {/* Header */}
            <div className="bg-[#1e3614] text-white p-6 relative">
              <button
                onClick={() => setViewingPass(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-1.5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#84cc16]" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#84cc16]">
                  One Day Kissan Gate Pass
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold font-mono tracking-tight">{viewingPass.reference}</h3>
              <p className="text-xs text-white/80 mt-1">Official digital admission token</p>
            </div>

            {/* Pass Body */}
            <div className="p-6 space-y-4">
              <div className="text-center py-4 bg-stone-50 rounded-2xl border border-stone-200/80">
                <div className="w-28 h-28 mx-auto bg-white p-2 rounded-xl shadow-inner border border-stone-200 flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-stone-800" />
                </div>
                <p className="text-[11px] text-stone-500 mt-2 font-mono">Scan at Farm Entrance Gate</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-stone-50 p-3 rounded-xl">
                  <span className="text-stone-500 font-semibold">Visitor / School</span>
                  <p className="font-bold text-stone-900 mt-0.5">{viewingPass.customerName}</p>
                  {viewingPass.orgName && <p className="text-stone-600 text-[11px]">{viewingPass.orgName}</p>}
                </div>
                <div className="bg-stone-50 p-3 rounded-xl">
                  <span className="text-stone-500 font-semibold">Farm Campus</span>
                  <p className="font-bold text-stone-900 mt-0.5">{viewingPass.farm}</p>
                  <p className="text-stone-600 text-[11px]">{viewingPass.visitType} Pass</p>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl">
                  <span className="text-stone-500 font-semibold">Visit Date</span>
                  <p className="font-bold text-stone-900 mt-0.5">{viewingPass.visitDate}</p>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl">
                  <span className="text-stone-500 font-semibold">Headcount</span>
                  <p className="font-bold text-[#2b4c1c] text-base mt-0.5">{viewingPass.headcount} Guests</p>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs flex justify-between items-center">
                <div>
                  <span className="text-emerald-800 font-bold">Advance Token Paid</span>
                  <p className="text-emerald-600 text-[11px]">Gate Balance Due: ₹{viewingPass.balanceDue}</p>
                </div>
                <span className="font-serif text-lg font-bold text-emerald-800">
                  ₹{viewingPass.tokenPaid.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                onClick={() => window.print()}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ADD MANUAL BOOKING */}
      {/* ==================================================== */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="bg-[#2b4c1c] text-white p-6 relative">
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-1.5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-serif text-xl font-bold">Add Walk-In / Phone Inquiry</h3>
              <p className="text-xs text-white/80 mt-1">Record a reservation taken by farm staff</p>
            </div>

            <form onSubmit={handleManualSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Campus Location</label>
                  <select
                    value={manualForm.farm}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, farm: e.target.value as "Bhongir" | "Moinabad" })
                    }
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  >
                    <option value="Bhongir">Bhongir Campus</option>
                    <option value="Moinabad">Moinabad Campus</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Visit Type</label>
                  <select
                    value={manualForm.visitType}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        visitType: e.target.value as "School" | "Corporate" | "Family"
                      })
                    }
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  >
                    <option value="School">School Study Tour (₹450/student)</option>
                    <option value="Corporate">Corporate Retreat (₹950/person)</option>
                    <option value="Family">Family Experience (₹750/person)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Customer / Coordinator Name *</label>
                <input
                  type="text"
                  required
                  value={manualForm.customerName}
                  onChange={(e) => setManualForm({ ...manualForm, customerName: e.target.value })}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Organization / School</label>
                  <input
                    type="text"
                    value={manualForm.orgName}
                    onChange={(e) => setManualForm({ ...manualForm, orgName: e.target.value })}
                    placeholder="e.g. St. Ann's High School"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={manualForm.phone}
                    onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Headcount (Guests) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={manualForm.headcount}
                    onChange={(e) => setManualForm({ ...manualForm, headcount: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Visit Date</label>
                  <input
                    type="date"
                    value={manualForm.visitDate}
                    onChange={(e) => setManualForm({ ...manualForm, visitDate: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Advance Token Paid (₹)</label>
                <input
                  type="number"
                  value={manualForm.tokenPaid}
                  onChange={(e) => setManualForm({ ...manualForm, tokenPaid: e.target.value })}
                  placeholder="e.g. 2500"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold text-emerald-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Internal Notes</label>
                <textarea
                  rows={2}
                  value={manualForm.notes}
                  onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                  placeholder="Special dietary requests, bus arrival times, etc."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="flex-1 py-3 border border-stone-200 rounded-xl text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#2b4c1c] hover:bg-[#1e3614] text-white rounded-xl font-bold"
                >
                  Confirm & Issue Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

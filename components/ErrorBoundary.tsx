"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw, Phone } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("SectionErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-16 px-4 max-w-4xl mx-auto my-8 rounded-3xl bg-[#ffffff] border border-[#2b4c1c]/15 shadow-sm text-center p-8">
          <div className="w-12 h-12 rounded-full bg-[#8a4724]/10 text-[#8a4724] flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#14230e]">
            {this.props.fallbackTitle || "This module is temporarily resting in the shade"}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#526048] max-w-md mx-auto leading-relaxed">
            {this.props.fallbackMessage ||
              "An unexpected error occurred while rendering this section. You can retry loading or connect with our farm team directly."}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={this.handleRetry}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614] shadow-xs flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Section</span>
            </button>
            <a
              href="tel:9849798674"
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#14230e] bg-[#faf7f0] hover:bg-[#f0e8db] border border-[#2b4c1c]/20 flex items-center gap-2 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#2b4c1c]" />
              <span>Helpdesk: +91 98497 98674</span>
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

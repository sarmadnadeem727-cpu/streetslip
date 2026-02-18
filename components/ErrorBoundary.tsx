import React, { Component, ErrorInfo, ReactNode } from 'react';
import { OctagonAlert } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    constructor(props: Props) {
        super(props);
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <div className="min-h-[50vh] flex flex-col items-center justify-center text-white p-8 text-center bg-black border border-red-500/20 rounded-xl m-4">
                    <OctagonAlert className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
                    <h2 className="text-2xl font-black uppercase tracking-widest mb-2 font-mono text-red-500">System Failure</h2>
                    <p className="text-gray-400 font-mono text-xs max-w-md mb-8 uppercase tracking-wider">
                        Critical error in logistics module.
                        <br />
                        <span className="text-red-500/80 mt-2 block bg-red-950/30 p-2 rounded border border-red-500/20">{this.state.error?.message}</span>
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-red-600 text-white font-black uppercase tracking-wider hover:bg-red-500 transition-colors rounded-none skew-x-[-10deg]"
                    >
                        Reboot System
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

// 'use client'
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { z } from 'zod';

// // Constants
// const CONFIG = {
//     USB_SCAN_TIMEOUT: 50,
//     STATUS_DISPLAY_DURATION: 3000,
//     MIN_USN_LENGTH: 10,
//     REFOCUS_DELAY: 16,
//     API_TIMEOUT: 10000,
//     HOME_REDIRECT_DELAY: 1000,
// } as const;

// const API_ENDPOINTS = {
//     VERIFY: 'http://localhost:8080/verify',
// } as const;

// // Schemas
// const usnSchema = z.string().min(CONFIG.MIN_USN_LENGTH);

// const apiResponseSchema = z.object({
//     verified: z.boolean().optional(),
//     status: z.enum(['verified', 'unverified']).optional(),
//     success: z.boolean().optional(),
//     message: z.string().optional(),
// }).refine(
//     data => data.verified !== undefined || data.status !== undefined || data.success !== undefined,
//     { message: "Response must contain verification status" }
// );

// // Types
// type ScanStatus = 'idle' | 'processing' | 'verified' | 'unverified' | 'error';

// interface VerificationPayload {
//     readonly usn: string;
//     readonly timestamp: number;
//     readonly gate: string;
// }

// interface StatusConfig {
//     readonly colorClass: string;
//     readonly bgClass: string;
//     readonly icon: string;
//     readonly message: string;
// }

// // Status configurations with Tailwind classes
// const STATUS_CONFIG: Record<ScanStatus, StatusConfig> = {
//     idle: {
//         colorClass: 'text-slate-600',
//         bgClass: 'bg-slate-50 border-slate-200',
//         icon: '📱',
//         message: 'Ready to Scan'
//     },
//     processing: {
//         colorClass: 'text-blue-600',
//         bgClass: 'bg-blue-50 border-blue-200',
//         icon: '⏳',
//         message: 'Processing...'
//     },
//     verified: {
//         colorClass: 'text-emerald-600',
//         bgClass: 'bg-emerald-50 border-emerald-200',
//         icon: '✅',
//         message: 'Access Granted'
//     },
//     unverified: {
//         colorClass: 'text-red-600',
//         bgClass: 'bg-red-50 border-red-200',
//         icon: '❌',
//         message: 'Access Denied'
//     },
//     error: {
//         colorClass: 'text-amber-600',
//         bgClass: 'bg-amber-50 border-amber-200',
//         icon: '⚠️',
//         message: 'System Error'
//     },
// } as const;

// // Custom hooks
// const useStableCallback = <T extends (...args: any[]) => any>(fn: T): T => {
//     const ref = useRef<T>(fn);
//     ref.current = fn;
//     return useCallback(((...args: Parameters<T>) => ref.current(...args)) as T, []);
// };

// const useTimeoutManager = () => {
//     const timeouts = useRef(new Set<NodeJS.Timeout>());
//     const addTimeout = useCallback((timeout: NodeJS.Timeout) => {
//         timeouts.current.add(timeout);
//     }, []);
//     const clearAllTimeouts = useCallback(() => {
//         timeouts.current.forEach(clearTimeout);
//         timeouts.current.clear();
//     }, []);
//     useEffect(() => clearAllTimeouts, [clearAllTimeouts]);
//     return { addTimeout, clearAllTimeouts };
// };

// // Utilities
// const createAbortController = () => {
//     const controller = new AbortController();
//     setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT);
//     return controller;
// };

// const isVerified = (response: z.infer<typeof apiResponseSchema>): boolean =>
//     response.verified === true ||
//     response.status === 'verified' ||
//     response.success === true;

// const sanitizeInput = (value: string): string =>
//     value.replace(/[\r\n\s]+/g, '');

// // Navigation handler
// const navigateToHome = () => {
//     if (typeof window !== 'undefined') {
//         window.location.href = '/';
//     }
// };

// // API layer
// class VerificationService {
//     static async verify(usn: string): Promise<{
//         success: boolean;
//         verified: boolean;
//         message: string;
//     }> {
//         const controller = createAbortController();
//         try {
//             const payload: VerificationPayload = {
//                 usn,
//                 timestamp: Date.now(),
//                 gate: "Gate 1"
//             };
//             const response = await fetch(API_ENDPOINTS.VERIFY, {
//                 method: "POST",
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload),
//                 signal: controller.signal
//             });
//             if (!response.ok) {
//                 throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//             }
//             const data = await response.json();
//             const validatedData = apiResponseSchema.parse(data);
//             return {
//                 success: true,
//                 verified: isVerified(validatedData),
//                 message: validatedData.message || STATUS_CONFIG[isVerified(validatedData) ? 'verified' : 'unverified'].message
//             };
//         } catch (error) {
//             console.error('[VerificationService] Error:', error);
//             return {
//                 success: false,
//                 verified: false,
//                 message: error instanceof Error ? error.message : 'Unknown error occurred'
//             };
//         }
//     }
// }

// // Main component
// export const Scanner: React.FC = () => {
//     const [status, setStatus] = useState<ScanStatus>('idle');
//     const [displayMessage, setDisplayMessage] = useState<string>('');
//     const [lastScannedUSN, setLastScannedUSN] = useState<string>('');

//     const inputRef = useRef<HTMLInputElement>(null);
//     const isProcessing = useRef<boolean>(false);
//     const { addTimeout, clearAllTimeouts } = useTimeoutManager();

//     // Reset UI to idle state and icon 📱
//     const resetToIdle = useStableCallback(() => {
//         setStatus('idle');
//         setDisplayMessage('');
//         setLastScannedUSN('');
//         isProcessing.current = false;
//         console.log('[Scanner] Reset to idle state');
//     });

//     const scheduleHomeRedirect = useStableCallback(() => {
//         const timeout = setTimeout(() => {
//             navigateToHome();
//         }, CONFIG.HOME_REDIRECT_DELAY);
//         addTimeout(timeout);
//     });

//     const updateStatus = useStableCallback((
//         newStatus: ScanStatus,
//         message?: string,
//         usn?: string
//     ) => {
//         setStatus(newStatus);
//         setDisplayMessage(message || STATUS_CONFIG[newStatus].message);
//         if (usn) setLastScannedUSN(usn);

//         if (newStatus !== 'idle' && newStatus !== 'processing') {
//             const statusTimeout = setTimeout(() => resetToIdle(), CONFIG.STATUS_DISPLAY_DURATION);
//             addTimeout(statusTimeout);

//             scheduleHomeRedirect();
//         }
//     });

//     const processScan = useStableCallback(async (rawValue: string) => {
//         if (isProcessing.current || !rawValue) return;
//         try {
//             const cleanValue = sanitizeInput(rawValue);
//             const validatedUSN = usnSchema.parse(cleanValue);
//             isProcessing.current = true;
//             updateStatus('processing', undefined, validatedUSN);
//             const result = await VerificationService.verify(validatedUSN);

//             if (result.success) {
//                 updateStatus(result.verified ? 'verified' : 'unverified', result.message);
//             } else {
//                 updateStatus('error', result.message);
//             }
//         } catch (error) {
//             updateStatus('error', 'Invalid barcode format');
//         }
//     });

//     const handleKeyDown = useStableCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
//         const target = e.currentTarget;

//         if (e.key === 'Enter') {
//             e.preventDefault();
//             const value = target.value.trim();
//             if (value) {
//                 processScan(value);
//                 target.value = '';
//             }
//             return;
//         }

//         clearAllTimeouts();
//         const timeout = setTimeout(() => {
//             const value = target.value.trim();
//             if (value && value.length >= CONFIG.MIN_USN_LENGTH) {
//                 processScan(value);
//                 target.value = '';
//             }
//         }, CONFIG.USB_SCAN_TIMEOUT);
//         addTimeout(timeout);
//     });

//     const handleInputChange = useStableCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         e.target.value = sanitizeInput(e.target.value);
//     });

//     const ensureFocus = useStableCallback(() => {
//         if (inputRef.current && status === 'idle') {
//             inputRef.current.focus();
//         }
//     });

//     useEffect(() => {
//         if (status === 'idle') {
//             const timeout = setTimeout(ensureFocus, CONFIG.REFOCUS_DELAY);
//             addTimeout(timeout);
//         }
//     }, [status, ensureFocus, addTimeout]);

//     useEffect(() => {
//         const handleGlobalClick = () => ensureFocus();
//         const handleVisibilityChange = () => {
//             if (!document.hidden) ensureFocus();
//         };

//         document.addEventListener('click', handleGlobalClick, { passive: true });
//         document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

//         return () => {
//             document.removeEventListener('click', handleGlobalClick);
//             document.removeEventListener('visibilitychange', handleVisibilityChange);
//         };
//     }, [ensureFocus]);

//     useEffect(() => {
//         return () => {
//             clearAllTimeouts();
//             isProcessing.current = false;
//         };
//     }, [clearAllTimeouts]);

//     useEffect(() => {
//         console.log(`[Scanner] status: ${status}, message: ${displayMessage}`);
//     }, [status, displayMessage]);

//     const currentConfig = STATUS_CONFIG[status];

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8">
//             {/* Hidden input for USB scanner */}
//             <input
//                 ref={inputRef}
//                 type="text"
//                 onChange={handleInputChange}
//                 onKeyDown={handleKeyDown}
//                 className="sr-only pointer-events-none border-0 outline-0"
//                 autoFocus
//                 autoComplete="off"
//                 autoCorrect="off"
//                 autoCapitalize="off"
//                 spellCheck={false}
//                 tabIndex={-1}
//                 aria-hidden="true"
//             />

//             {/* Main scanner interface */}
//             <div className={`
//                 max-w-md w-full p-8 rounded-2xl shadow-lg border transition-all duration-300 ease-in-out
//                 ${currentConfig.bgClass}
//             `}>
//                 <div className="text-center space-y-6">
//                     {/* Status icon with animation */}
//                     <div className="relative">
//                         <div className={`
//                             inline-flex items-center justify-center w-20 h-20 rounded-full
//                             ${status === 'processing' ? 'animate-pulse' : ''}
//                             ${currentConfig.bgClass} border-2 ${currentConfig.colorClass.replace('text-', 'border-')}
//                             shadow-sm
//                         `}>
//                             <span
//                                 className="text-3xl"
//                                 role="img"
//                                 aria-label={status}
//                             >
//                                 {currentConfig.icon}
//                             </span>
//                         </div>
//                         {status === 'processing' && (
//                             <div className="absolute -inset-2 border-2 border-blue-300 rounded-full animate-ping opacity-75" />
//                         )}
//                     </div>

//                     {/* Status message */}
//                     <div className="space-y-2">
//                         <h2
//                             className={`text-xl font-semibold ${currentConfig.colorClass} transition-colors duration-200`}
//                             role="status"
//                             aria-live="polite"
//                         >
//                             {displayMessage || currentConfig.message}
//                         </h2>

//                         {/* USN display */}
//                         {lastScannedUSN && status !== 'idle' && (
//                             <div
//                                 className="inline-block px-3 py-1 bg-white rounded-lg border shadow-sm"
//                                 aria-label={`Scanned USN: ${lastScannedUSN}`}
//                             >
//                                 <span className="text-xs text-slate-500 font-medium">USN:</span>
//                                 <span className="ml-2 text-sm font-mono font-semibold text-slate-700">
//                                     {lastScannedUSN}
//                                 </span>
//                             </div>
//                         )}
//                     </div>

//                     {/* Instructions for idle state */}
//                     {status === 'idle' && (
//                         <div className="pt-4 border-t border-slate-200">
//                             <p className="text-slate-500 text-sm leading-relaxed">
//                                 Position your barcode scanner and scan to verify access
//                             </p>
//                             <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-slate-400">
//                                 <div className="w-2 h-2 bg-slate-300 rounded-full animate-pulse" />
//                                 <span>Ready for input</span>
//                             </div>
//                         </div>
//                     )}

//                     {/* Progress indicator for non-idle states */}
//                     {status !== 'idle' && (
//                         <div className="pt-4">
//                             <div className="w-full bg-slate-200 rounded-full h-1">
//                                 <div className={`
//                                     h-1 rounded-full transition-all duration-1000 ease-out
//                                     ${status === 'processing'
//                                         ? 'w-1/3 bg-blue-500 animate-pulse'
//                                         : 'w-full bg-slate-400'
//                                     }
//                                 `} />
//                             </div>
//                             {status !== 'processing' && (
//                                 <p className="text-xs text-slate-500 mt-2">
//                                     Returning to home in a moment...
//                                 </p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
























// PremiumDownloadButton.jsx - ONLY INNER SPINNER (OUTER REMOVED)
import { useState } from 'react';
import { motion } from 'framer-motion';

const PremiumDownloadButton = ({
  onDownload,
  children = '📄 Download PDF',
  className = ''
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDownload = async () => {
    if (isDownloading || isSuccess) return;

    setIsDownloading(true);
    setIsSuccess(false);

    try {
      await onDownload();
      setIsDownloading(false);
      setIsSuccess(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
    }
  };

  return (
    <div className="inline-block">
      <motion.button
        onClick={handleDownload}
        whileHover={{ scale: isDownloading || isSuccess ? 1 : 1.08 }}
        whileTap={{ scale: isDownloading || isSuccess ? 1 : 0.95 }}
        className={`
          group relative overflow-hidden 
          font-black tracking-wider text-xl sm:text-xl 
          py-6 px-10  mx-rounded-3xl shadow-2xl 
          transition-all duration-500 select-none 
          flex items-center justify-center
          ${isDownloading || isSuccess ? 'cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        style={{
          background: isDownloading
            ? 'linear-gradient(135deg, #2563eb, #3b82f6)'
            : isSuccess
            ? 'linear-gradient(135deg, #f59e0b, #fbbf24)'
            : 'linear-gradient(135deg, #ea580c, #dc2626)',
          color: 'white',
          boxShadow: isDownloading
            ? '0 0 40px rgba(59, 130, 246, 0.6)'
            : isSuccess
            ? '0 0 50px rgba(251, 191, 36, 0.8)'
            : '0 20px 50px rgba(234, 88, 12, 0.5)',
          border: 'none',
          minWidth: '310px',
          height: '75px',
        }}
      >
        {/* Background Glow Pulse on Success */}
        {isSuccess && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(251,191,36,0.4) 0%, transparent 70%)',
              animation: 'successPulse 2s ease-out',
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center gap-5 h-full">
          {/* ONLY INNER SPINNER - OUTER COMPLETELY REMOVED */}
          {isDownloading && (
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                {/* ONLY HIGH-OPACITY INNER SPINNER - FULL SIZE */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    border: '5px solid rgba(255,255,255,0.25)',
                    borderTop: '5px solid rgba(255,255,255,0.8)',
                    borderRadius: '50%',
                    animation: 'spinInner 0.8s linear infinite reverse',
                  }}
                />
              </motion.div>
              <motion.span 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '900',
                  letterSpacing: '0.1em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                Generating PDF...
              </motion.span>
            </motion.div>
          )}

          {/* Success State - "COMPLETE!" Perfectly Centered */}
          {isSuccess && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  fontSize: '2.2rem',
                  fontWeight: '900',
                  letterSpacing: '0.15em',
                  textShadow: '0 0 30px rgba(251,191,36,0.8), 0 4px 10px rgba(0,0,0,0.4)',
                  marginBottom: '8px',
                }}
              >
                COMPLETE!
              </motion.div>
            </motion.div>
          )}

          {/* Default State */}
          {!isDownloading && !isSuccess && (
            <span style={{
              fontSize: '1.25rem',
              fontWeight: '900',
              letterSpacing: '0.05em',
            }}>
              {children}
            </span>
          )}
        </div>

        {/* Inline Animations */}
        <style jsx>{`
          @keyframes successPulse {
            0% { transform: scale(0.9); opacity: 0; }
            50% { opacity: 0.6; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          
          @keyframes spinInner {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
        `}</style>
      </motion.button>
    </div>
  );
};

export default PremiumDownloadButton;

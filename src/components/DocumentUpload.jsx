import React, { useState } from 'react';
import { auth } from '../firebase';
import { Upload, X, CheckCircle, AlertCircle, FileText } from 'lucide-react';

const DocumentUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Basic validation: limit size to 2MB for local storage
            if (selectedFile.size > 2 * 1024 * 1024) {
                setError("File size exceeds 2MB limit for local storage.");
                setFile(null);
                return;
            }
            setFile(selectedFile);
            setError(null);
            setSuccess(false);
            setProgress(0);
        }
    };

    const handleUpload = () => {
        if (!file) return;

        const user = auth.currentUser;
        if (!user) {
            setError("You must be logged in to upload documents.");
            return;
        }

        setUploading(true);
        setError(null);
        setProgress(0);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            const newDoc = {
                id: Date.now().toString(),
                name: file.name,
                fullPath: `localDocs/${user.uid}/${Date.now()}_${file.name}`,
                url: base64String,
                createdAt: new Date().toISOString(),
                size: (file.size / 1024).toFixed(2) + ' KB'
            };

            try {
                const storageKey = `documents_${user.uid}`;
                const existingDocs = JSON.parse(localStorage.getItem(storageKey) || '[]');
                existingDocs.push(newDoc);
                localStorage.setItem(storageKey, JSON.stringify(existingDocs));

                setUploading(false);
                setSuccess(true);
                setFile(null);
                if (onUploadSuccess) {
                    onUploadSuccess(newDoc);
                }
            } catch (err) {
                console.error("Local storage error:", err);
                setError("Failed to save locally. File might be too large (Browser limit).");
                setUploading(false);
            }
        };
        
        reader.onerror = () => {
            setError("Failed to read file.");
            setUploading(false);
        };

        // Simulate progress for better UX
        let prog = 0;
        const interval = setInterval(() => {
            prog += 20;
            setProgress(prog);
            if (prog >= 100) {
                clearInterval(interval);
                reader.readAsDataURL(file); // Actually read and save
            }
        }, 100);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="text-sky-500" size={20} />
                Upload Document
            </h3>

            <div className="space-y-4">
                {!uploading && !success && (
                    <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 transition-colors hover:border-sky-400 group">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept=".pdf,image/*"
                        />
                        <div className="flex flex-col items-center text-center">
                            <FileText className="text-gray-400 group-hover:text-sky-500 mb-2" size={40} />
                            <p className="text-sm text-gray-600">
                                {file ? (
                                    <span className="font-semibold text-sky-600">{file.name}</span>
                                ) : (
                                    "Click or drag to upload (PDF, JPG, PNG)"
                                )}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Max size: 2MB (Local Storage)</p>
                        </div>
                    </div>
                )}

                {uploading && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Uploading...</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-xl border border-green-100">
                        <CheckCircle size={20} />
                        <span className="text-sm font-medium">Document uploaded successfully!</span>
                        <button
                            onClick={() => setSuccess(false)}
                            className="ml-auto text-green-500 hover:text-green-700"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
                        <AlertCircle size={20} />
                        <span className="text-sm font-medium">{error}</span>
                        <button
                            onClick={() => setError(null)}
                            className="ml-auto text-red-500 hover:text-red-700"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}

                {file && !uploading && !success && (
                    <button
                        onClick={handleUpload}
                        className="w-full py-3 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 transition-colors shadow-lg shadow-sky-100"
                    >
                        Confirm Upload
                    </button>
                )}
            </div>
        </div>
    );
};

export default DocumentUpload;

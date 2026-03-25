import React, { useState } from 'react';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase';
import { Upload, X, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DocumentUpload = ({ onUploadSuccess }) => {
    const [uploadMode, setUploadMode] = useState('firebase'); // 'firebase' or 'google-drive'
    const { googleToken, loginWithGoogle } = useAuth();
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Limit size to 10MB
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError("File size exceeds 10MB limit.");
                setFile(null);
                return;
            }
            setFile(selectedFile);
            setError(null);
            setSuccess(false);
            setProgress(0);
        }
    };

    const uploadToGoogleDrive = async (file, token) => {
        const metadata = {
            name: file.name,
            mimeType: file.type,
        };

        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', file);

        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + token }),
            body: form,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Google Drive upload failed');
        }

        const driveFile = await response.json();

        // SHARE THE FILE: Set permission to "anyone with the link" so doctors can see it
        try {
            await fetch(`https://www.googleapis.com/drive/v3/files/${driveFile.id}/permissions`, {
                method: 'POST',
                headers: new Headers({ 
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    role: 'reader',
                    type: 'anyone'
                }),
            });
        } catch (shareErr) {
            console.error("Failed to set Google Drive permissions:", shareErr);
            // We don't throw here, as the file is still uploaded, just might not be shared yet
        }

        return driveFile;
    };

    const handleUpload = async () => {
        if (!file) return;

        const user = auth.currentUser;
        if (!user) {
            setError("You must be logged in to upload documents.");
            return;
        }

        // Check Google Drive token if in Drive mode
        if (uploadMode === 'google-drive' && !googleToken) {
            setError("Google Drive access required. Please re-login with Google.");
            return;
        }

        setUploading(true);
        setError(null);
        setProgress(10);

        const timestamp = Date.now();
        const baseDocInfo = {
            id: timestamp.toString(),
            name: file.name,
            createdAt: new Date().toISOString(),
            size: (file.size / 1024).toFixed(2) + ' KB',
        };

        try {
            let finalUrl = '';
            let storagePath = '';

            if (uploadMode === 'firebase') {
                const cleanFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
                storagePath = `documents/${user.uid}/${timestamp}_${cleanFileName}`;
                const storageRef = ref(storage, storagePath);
                
                const snapshot = await uploadBytes(storageRef, file);
                setProgress(60);
                finalUrl = await getDownloadURL(snapshot.ref);
            } else {
                // Google Drive Upload
                const driveFile = await uploadToGoogleDrive(file, googleToken);
                setProgress(80);
                finalUrl = driveFile.webViewLink;
                // Note: We might want to make it public or shared, but for now we take the link
            }

            const newDoc = {
                ...baseDocInfo,
                fullPath: storagePath || 'google-drive',
                url: finalUrl,
                provider: uploadMode
            };

            // Save to localStorage
            const storageKey = `documents_${user.uid}`;
            const existingDocs = JSON.parse(localStorage.getItem(storageKey) || '[]');
            localStorage.setItem(storageKey, JSON.stringify([newDoc, ...existingDocs]));

            setProgress(100);
            setUploading(false);
            setSuccess(true);
            setFile(null);
            if (onUploadSuccess) {
                onUploadSuccess(newDoc);
            }
        } catch (err) {
            console.error("Upload failed:", err);
            setUploading(false);
            setError("Upload failed: " + (err.message || "Unknown error"));
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Upload className="text-sky-500" size={20} />
                Upload Document
            </h3>

            {/* Mode Toggle */}
            <div className="flex bg-gray-50 p-1 rounded-xl mb-4 text-xs font-medium">
                <button 
                    onClick={() => setUploadMode('firebase')}
                    className={`flex-1 py-2 rounded-lg transition-all ${uploadMode === 'firebase' ? 'bg-white shadow-sm text-sky-600' : 'text-gray-500'}`}
                >
                    Firebase Cloud
                </button>
                <button 
                    onClick={() => setUploadMode('google-drive')}
                    className={`flex-1 py-2 rounded-lg transition-all ${uploadMode === 'google-drive' ? 'bg-white shadow-sm text-sky-600' : 'text-gray-500'}`}
                >
                    Google Drive
                </button>
            </div>

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
                            <p className="text-xs text-gray-400 mt-1">Max size: 10MB · Stored securely in Firebase</p>
                        </div>
                    </div>
                )}

                {uploading && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Uploading to secure cloud...</span>
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

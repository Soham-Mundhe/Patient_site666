import React, { useState } from 'react';
import { storage, auth } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
            // Basic validation: limit size to 5MB
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError("File size exceeds 5MB limit.");
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

        const storageRef = ref(storage, `documents/${user.uid}/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(Math.round(progress));
            },
            (error) => {
                console.error("Upload error:", error);
                setError("Failed to upload file. Please try again.");
                setUploading(false);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setUploading(false);
                    setSuccess(true);
                    setFile(null);
                    if (onUploadSuccess) {
                        onUploadSuccess({
                            name: file.name,
                            url: downloadURL,
                            createdAt: new Date().toISOString()
                        });
                    }
                } catch (err) {
                    console.error("Error getting download URL:", err);
                    setError("Upload completed but failed to get file URL.");
                    setUploading(false);
                }
            }
        );
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
                            <p className="text-xs text-gray-400 mt-1">Max size: 5MB</p>
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

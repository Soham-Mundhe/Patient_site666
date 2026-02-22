import React, { useState, useEffect } from 'react';
import { storage, auth } from '../firebase';
import { ref, listAll, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';
import { FileText, Trash2, ExternalLink, PlusCircle, Search, Filter, Loader2 } from 'lucide-react';
import DocumentUpload from '../components/DocumentUpload';

const MyDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUpload, setShowUpload] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchDocuments = async () => {
        const user = auth.currentUser;
        if (!user) return;

        setLoading(true);
        try {
            const listRef = ref(storage, `documents/${user.uid}`);
            const res = await listAll(listRef);

            const docsData = await Promise.all(
                res.items.map(async (itemRef) => {
                    const url = await getDownloadURL(itemRef);
                    const metadata = await getMetadata(itemRef);
                    return {
                        id: itemRef.name,
                        name: itemRef.name.split('_').slice(1).join('_') || itemRef.name, // Remove timestamp prefix
                        fullPath: itemRef.fullPath,
                        url,
                        createdAt: metadata.timeCreated,
                        size: (metadata.size / 1024).toFixed(2) + ' KB'
                    };
                })
            );

            // Sort by creation date (newest first)
            setDocuments(docsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error("Error fetching documents:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleDelete = async (fullPath) => {
        if (!window.confirm("Are you sure you want to delete this document?")) return;

        try {
            const docRef = ref(storage, fullPath);
            await deleteObject(docRef);
            setDocuments(documents.filter(doc => doc.fullPath !== fullPath));
        } catch (error) {
            console.error("Error deleting document:", error);
            alert("Failed to delete document.");
        }
    };

    const filteredDocuments = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-24 pt-4 px-4">
            <div className="max-w-md mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
                        <p className="text-sm text-gray-500">Manage your medical records</p>
                    </div>
                    <button
                        onClick={() => setShowUpload(!showUpload)}
                        className={`p-2 rounded-full transition-colors ${showUpload ? 'bg-gray-200 text-gray-600' : 'bg-sky-500 text-white shadow-lg shadow-sky-100'
                            }`}
                    >
                        {showUpload ? <X size={24} /> : <PlusCircle size={24} />}
                    </button>
                </div>

                {/* Upload Section */}
                {showUpload && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                        <DocumentUpload onUploadSuccess={() => {
                            fetchDocuments();
                            setShowUpload(false);
                        }} />
                    </div>
                )}

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                </div>

                {/* Documents List */}
                <div className="space-y-3">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-3">
                            <Loader2 className="animate-spin text-sky-500" size={32} />
                            <p className="text-gray-500 text-sm">Loading documents...</p>
                        </div>
                    ) : filteredDocuments.length > 0 ? (
                        filteredDocuments.map((doc) => (
                            <div key={doc.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex items-center gap-4 group">
                                <div className="p-3 bg-sky-50 text-sky-500 rounded-lg">
                                    <FileText size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate">{doc.name}</h4>
                                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                                        <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{doc.size}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                    <button
                                        onClick={() => handleDelete(doc.fullPath)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                            <FileText className="mx-auto text-gray-300 mb-3" size={40} />
                            <p className="text-gray-500 font-medium">No documents found</p>
                            <p className="text-sm text-gray-400">Upload your first document to get started</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyDocuments;

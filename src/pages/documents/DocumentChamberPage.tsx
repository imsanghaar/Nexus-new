import React, { useState } from 'react';
import { FileText, Upload, Download, Eye, Edit3, Check, X, Clock, AlertCircle } from 'lucide-react';
import { DocumentUpload } from '../../components/ui/DocumentUpload';
import { SignaturePad } from '../../components/ui/SignaturePad';
import { Button } from '../../components/ui/Button';

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'agreement' | 'proposal' | 'other';
  status: 'draft' | 'in-review' | 'signed' | 'rejected';
  date: Date;
  size: string;
  uploadedBy: string;
}

export const DocumentChamberPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { 
      id: '1', 
      name: 'Investment Agreement.pdf', 
      type: 'agreement', 
      status: 'in-review', 
      date: new Date(Date.now() - 86400000), 
      size: '2.4 MB', 
      uploadedBy: 'John Doe' 
    },
    { 
      id: '2', 
      name: 'Partnership Contract.pdf', 
      type: 'contract', 
      status: 'signed', 
      date: new Date(Date.now() - 172800000), 
      size: '1.8 MB', 
      uploadedBy: 'Jane Smith' 
    },
    { 
      id: '3', 
      name: 'Project Proposal.docx', 
      type: 'proposal', 
      status: 'draft', 
      date: new Date(Date.now() - 259200000), 
      size: '0.9 MB', 
      uploadedBy: 'Robert Johnson' 
    },
  ]);
  
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signature, setSignature] = useState<string>('');

  const handleFileUpload = (file: File) => {
    const newDocument: Document = {
      id: Date.now().toString(),
      name: file.name,
      type: 'other',
      status: 'draft',
      date: new Date(),
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadedBy: 'Current User'
    };
    
    setDocuments([newDocument, ...documents]);
  };

  const updateDocumentStatus = (id: string, status: Document['status']) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? { ...doc, status } : doc
    ));
  };

  const handleSignatureComplete = (sig: string) => {
    setSignature(sig);
  };

  const handleSignDocument = () => {
    if (selectedDocument && signature) {
      updateDocumentStatus(selectedDocument.id, 'signed');
      setShowSignaturePad(false);
      setSignature('');
      setSelectedDocument(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'in-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'signed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Edit3 className="w-4 h-4" />;
      case 'in-review':
        return <Clock className="w-4 h-4" />;
      case 'signed':
        return <Check className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Document Processing Chamber</h1>
        <Button variant="primary" leftIcon={<Upload className="w-4 h-4" />}>
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload New Document</h2>
            <DocumentUpload 
              onFileUpload={handleFileUpload}
              acceptedTypes={['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx']}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Documents</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded By
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.map((document) => (
                    <tr key={document.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{document.name}</div>
                            <div className="text-sm text-gray-500">{document.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {document.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full flex items-center ${getStatusColor(document.status)}`}>
                          {getStatusIcon(document.status)}
                          <span className="ml-1 capitalize">{document.status.replace('-', ' ')}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {document.uploadedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {document.date.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-primary-600 hover:text-primary-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Download className="w-4 h-4" />
                          </button>
                          {document.status !== 'signed' && (
                            <button 
                              onClick={() => {
                                setSelectedDocument(document);
                                setShowSignaturePad(true);
                              }}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Document Preview</h2>
            
            {selectedDocument ? (
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{selectedDocument.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs flex items-center ${getStatusColor(selectedDocument.status)}`}>
                      {getStatusIcon(selectedDocument.status)}
                      <span className="ml-1 capitalize">{selectedDocument.status.replace('-', ' ')}</span>
                    </span>
                  </div>
                  
                  <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Document Preview</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <p className="text-sm"><span className="font-medium">Type:</span> {selectedDocument.type}</p>
                    <p className="text-sm"><span className="font-medium">Size:</span> {selectedDocument.size}</p>
                    <p className="text-sm"><span className="font-medium">Uploaded by:</span> {selectedDocument.uploadedBy}</p>
                    <p className="text-sm"><span className="font-medium">Date:</span> {selectedDocument.date.toLocaleDateString()}</p>
                  </div>
                </div>
                
                {selectedDocument.status !== 'signed' && (
                  <div className="mt-4">
                    <Button 
                      variant="primary" 
                      fullWidth
                      onClick={() => setShowSignaturePad(true)}
                    >
                      Sign Document
                    </Button>
                    
                    {selectedDocument.status === 'in-review' && (
                      <div className="flex space-x-2 mt-2">
                        <Button 
                          variant="success" 
                          fullWidth
                          onClick={() => updateDocumentStatus(selectedDocument.id, 'signed')}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="error" 
                          fullWidth
                          onClick={() => updateDocumentStatus(selectedDocument.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p>Select a document to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Signature Pad Modal */}
      {showSignaturePad && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Sign Document</h3>
                <button 
                  onClick={() => setShowSignaturePad(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  Please sign the document: <span className="font-medium">{selectedDocument.name}</span>
                </p>
                
                <SignaturePad 
                  onSignatureChange={handleSignatureComplete}
                  width={500}
                  height={200}
                />
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowSignaturePad(false);
                      setSignature('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleSignDocument}
                    disabled={!signature}
                  >
                    Complete Signature
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
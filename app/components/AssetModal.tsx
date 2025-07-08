"use client";
import { useRef, useState } from "react";
import { X, ExternalLink, Grid3X3, Info, Heart } from "lucide-react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useLibraryStore } from "../store/useLibraryStore";
import AccessRequestModal from "./RequestModal";

export const AssetModal = ({ asset, onClose }: { asset: any; onClose: () => void }) => {
    if (!asset) return null;
    const { requestAccessAsset, favoriteAsset } = useLibraryStore();
    const [isAccessModalOpen, setIsAccessModalOpen] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    const handleAccessRequest = async (reason: string) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!asset.hasAccess) {
            requestAccessAsset(asset.id);
        } else {
            console.warn("Asset already has access.");
        }

        toast(`Access request submitted for ${asset.title}. Reason: ${reason}`);

        setIsAccessModalOpen(false);
    };

    const handleFavorite = () => {
        console.log("Favorite asset:", asset.id);
        favoriteAsset(asset.id);
        toast(`Asset ${asset.title} has been favorited.`);
    };

    const handleCopy = () => {
        if (descriptionRef.current) {
            const text = descriptionRef.current.innerText;
            navigator.clipboard.writeText(text)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch(err => console.error('Copy failed:', err));
        }
    };

    const renderModalContent = () => {
        switch (asset.type) {
            case 'kpi':
                return (
                    <div>
                        {asset?.description && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Descriptive name of the Layout</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {asset?.description ?? ""}
                                </p>
                            </div>
                        )}
                        {asset?.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 my-4">
                                {asset?.tags?.map((tag: string, index: number) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="grid grid-cols-4 gap-4 py-4 border-y border-gray-100 my-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">2485</div>
                                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                                    Used <Info className="w-3 h-3" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">Universal</div>
                                <div className="text-xs text-gray-500">Type</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">6</div>
                                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                                    Pages No. <Info className="w-3 h-3" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">07/23/2024</div>
                                <div className="text-xs text-gray-500">Last Updated</div>
                            </div>
                        </div>
                        <div className="border-y border-gray-100 my-4 bg-gray-200" style={{ minHeight: "300px" }}> </div>
                        {asset.businessQuestions.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Questions</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {asset.businessQuestions?.map((q: string, idx: number) => (
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h5 className="font-medium text-gray-900 mb-2">Question {idx + 1}</h5>
                                            <p className="text-sm text-gray-600">
                                                {q}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {asset.affiliate && <p className="text-sm my-4"><b>Affiliate:</b> {asset.affiliate}</p>}
                        <div className="bg-gray-900 text-white p-4 rounded-lg">
                            <div className="flex items-center justify-center">
                                <div className="flex items-center space-x-2">
                                    <Heart className="w-4 h-4" />
                                    <span className="font-medium" onClick={handleFavorite}>Favorite Item</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'layout':
                return (
                    <div>
                        <h2 className="text-xl font-bold">Layout Detail</h2>
                        <p className="mt-2 text-sm">KPIs: {asset.kpis?.join(', ')}</p>
                        {asset?.description && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Assets Info</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {asset?.description ?? ""}
                                </p>
                            </div>
                        )}
                        <p className="mt-2 text-sm">Number of Pages: {asset.numPages}</p>
                    </div>
                );
            case 'dataviz':
                return (
                    <div>
                        <h2 className="text-xl font-bold">Dtaviz Detail</h2>
                        <p className="mt-2 text-sm">KPIs: {asset.kpis?.join(', ')}</p>
                        {asset?.description && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Assets Info</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {asset?.description ?? ""}
                                </p>
                            </div>
                        )}
                        <div className="border-y border-gray-100 my-4 bg-gray-200" style={{ minHeight: "300px" }}> </div>
                    </div>
                );
            case 'storyboard':
                return (
                    <div>
                        <h2 className="text-xl font-bold">Storyboard Detail</h2>
                        <p className="mt-2 text-sm">Coupled KPIs: {asset.coupledKpis?.join(', ')}</p>
                        <div className="border-y border-gray-100 my-4 bg-gray-200" style={{ minHeight: "300px" }}> </div>
                        <p className="mt-2 text-sm">Filters: {asset.filters?.join(', ')}</p>
                        <p className="mt-2 text-sm">Applicable Affiliates: {asset.applicableAffiliates?.join(', ')}</p>
                        {!asset.hasAccess && <><button onClick={() => setIsAccessModalOpen(true)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Request Access</button>
                            <AccessRequestModal
                                isOpen={isAccessModalOpen}
                                onClose={() => setIsAccessModalOpen(false)}
                                onSubmit={handleAccessRequest}
                                assetName={asset.title ?? "N/A"}
                            /></>}
                    </div>
                );
            default:
                return <div>No detail available.</div>;
        }
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={onClose}
            />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    {copied && <div className="text-green-600 text-sm text-center">Copied!</div>}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Grid3X3 className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 uppercase">{asset?.title ?? ""}</h2>
                                <p className="text-sm text-gray-500 uppercase">{asset?.type ?? ""}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200" onClick={handleCopy}>
                                <ExternalLink className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                        <div className="p-6 space-y-6" ref={descriptionRef}>
                            {renderModalContent()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

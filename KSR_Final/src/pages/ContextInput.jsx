import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contextExamples, contextTags } from '../data/mockData';
import { LightbulbIcon, CheckCircleIcon } from '../components/Icons';
import '../styles/dashboard.css';

const ContextInput = () => {
    const navigate = useNavigate();
    const [contextText, setContextText] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedExample, setSelectedExample] = useState(null);
    const [saved, setSaved] = useState(false);

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const loadExample = (example) => {
        setSelectedExample(example);
        setContextText(example.context);
        setSelectedTags(example.tags);
    };

    const handleSave = () => {
        // In a real app, this would save to backend
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
        }, 3000);
    };

    const handleGenerateRecommendation = () => {
        // Save context and navigate to recommendations
        handleSave();
        setTimeout(() => {
            navigate('/recommendations');
        }, 500);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Context Input Panel</h1>
                    <p className="page-subtitle">Add real-world context to help AI understand the story behind the numbers</p>
                </div>
            </div>

            {/* Why Context Matters */}
            <div className="info-banner mb-lg">
                <div className="info-icon">
                    <LightbulbIcon size={20} />
                </div>
                <div>
                    <strong>Why Context Matters:</strong> Numbers alone don't tell the full story. Your contextual knowledge about market conditions, team situations, and strategic initiatives helps the AI generate more accurate and actionable recommendations.
                </div>
            </div>

            <div className="grid-2">
                {/* Main Context Input */}
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Add Your Context</h2>
                    </div>

                    <div className="context-panel">
                        <div className="context-input-group">
                            <label className="context-label">
                                What contextual factors should we consider?
                            </label>
                            <textarea
                                className="context-textarea"
                                value={contextText}
                                onChange={(e) => setContextText(e.target.value)}
                                placeholder="E.g., We're launching a new product next month, there's a seasonal trend in Q2, our main competitor just raised prices, we have budget constraints this quarter..."
                                rows={8}
                            ></textarea>
                            <div className="char-count">
                                {contextText.length} characters
                            </div>
                        </div>

                        <div className="context-input-group">
                            <label className="context-label">Quick Context Tags</label>
                            <div className="context-tags">
                                {contextTags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className={`context-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex-between mt-lg">
                            <button
                                className="btn btn-secondary"
                                onClick={handleSave}
                                disabled={!contextText.trim()}
                            >
                                {saved ? (
                                    <>
                                        <CheckCircleIcon size={16} />
                                        Saved!
                                    </>
                                ) : (
                                    'Save Context'
                                )}
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleGenerateRecommendation}
                                disabled={!contextText.trim()}
                            >
                                Generate Recommendation
                            </button>
                        </div>
                    </div>
                </div>

                {/* Example Contexts */}
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Example Contexts</h2>
                        <p className="card-subtitle">Click to load an example</p>
                    </div>

                    <div className="example-list">
                        {contextExamples.map((example) => (
                            <div
                                key={example.id}
                                className={`example-card ${selectedExample?.id === example.id ? 'selected' : ''}`}
                                onClick={() => loadExample(example)}
                            >
                                <h4 className="example-title">{example.scenario}</h4>
                                <p className="example-text">{example.context}</p>
                                <div className="example-tags">
                                    {example.tags.map((tag, index) => (
                                        <span key={index} className="tag-small">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Context Tips */}
                    <div className="tips-box mt-lg">
                        <h4 className="tips-title">💡 Tips for Good Context</h4>
                        <ul className="tips-list">
                            <li>Explain <strong>why</strong> metrics changed, not just what changed</li>
                            <li>Include timing information (when did this start?)</li>
                            <li>Mention external factors (market, competitors, seasonality)</li>
                            <li>Note any planned changes or initiatives</li>
                            <li>Be specific with numbers when possible</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Recent Context History */}
            <div className="card mt-lg">
                <div className="card-header">
                    <h2 className="card-title">Recent Context Entries</h2>
                    <p className="card-subtitle">Your previously added context</p>
                </div>
                <div className="context-history">
                    <div className="history-item">
                        <div className="history-date">2 hours ago</div>
                        <div className="history-content">
                            Marketing budget is over because we accelerated our product launch campaign by 3 weeks to beat a competitor to market...
                        </div>
                        <div className="history-tags">
                            <span className="tag-small">🚀 Product Launch</span>
                            <span className="tag-small">🏆 Competitive Response</span>
                        </div>
                    </div>
                    <div className="history-item">
                        <div className="history-date">1 day ago</div>
                        <div className="history-content">
                            Engineering productivity dipped this week due to our planned infrastructure migration to AWS...
                        </div>
                        <div className="history-tags">
                            <span className="tag-small">🔧 Technical Debt</span>
                            <span className="tag-small">📊 Data Quality Issue</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContextInput;

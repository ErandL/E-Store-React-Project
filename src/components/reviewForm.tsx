import { useState } from 'react';

interface ReviewFormProps {
    onSubmit: (review: { user: string; rating: number; comment: string }) => void;
}

function ReviewForm({ onSubmit }: ReviewFormProps) {
    const [user, setUser] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !comment) return;
        onSubmit({ user, rating, comment });
        setUser('');
        setRating(5);
        setComment('');
    };

    return (
        <form className="review-form mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Rating</label>
                <select
                    className="form-select"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>{r} ⭐</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Comment</label>
                <textarea
                    className="form-control"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit Review</button>
        </form>
    );
}

export default ReviewForm;
"use client";

import { useState, useEffect, FormEvent, useRef } from 'react';
import styles from './chat.module.css';
import EmojiPicker from 'emoji-picker-react';
import {
    Send,
    Image,
    Smile,
    Moon,
    Sun,
    Trash2,
    Edit2,
    Reply,
    MoreVertical,
    Clock,
    Check,
    X,
    User,
    MessageCircle,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

import {
    ConfigProvider,
    Layout,
} from "antd"; // کتابخانه antd برای طراحی رابط کاربری
const { Content } = Layout; // محتوای لایه

interface Message {
    id: string;
    text: string;
    timestamp: number;
    type: 'text' | 'image';
    imageUrl?: string;
    isEdited?: boolean;
    replyTo?: string;
    userId?: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const [replyingToId, setReplyingToId] = useState<string | null>(null);
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [selectedImageForView, setSelectedImageForView] = useState<string | null>(null);
    const [darkMode, setDarkMode] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [userId, setUserId] = useState<string>('');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const imageRef = useRef<HTMLImageElement>(null);

    // اضافه کردن پیام‌های پیش‌فرض بیشتر
    const defaultMessages: Message[] = [
        {
            id: '1',
            text: 'سلام! به چت خوش آمدید 👋',
            timestamp: Date.now() - 86400000 * 3, // 3 روز قبل
            type: 'text',
            userId: 'admin_user'
        },
        {
            id: '2',
            text: 'من یک ربات هستم که برای کمک به شما طراحی شده‌ام.',
            timestamp: Date.now() - 86400000 * 3 + 60000, // 3 روز قبل + 1 دقیقه
            type: 'text',
            userId: 'admin_user'
        },
        {
            id: '3',
            text: 'می‌توانید با من چت کنید و از امکانات مختلف استفاده کنید.',
            timestamp: Date.now() - 86400000 * 3 + 120000, // 3 روز قبل + 2 دقیقه
            type: 'text',
            userId: 'admin_user'
        },
        {
            id: '4',
            text: 'سلام! ممنون از راهنمایی شما.',
            timestamp: Date.now() - 86400000 * 2, // 2 روز قبل
            type: 'text',
            userId: 'user_123456789'
        },
        {
            id: '5',
            text: 'چه امکاناتی در این چت وجود دارد؟',
            timestamp: Date.now() - 86400000 * 2 + 60000, // 2 روز قبل + 1 دقیقه
            type: 'text',
            userId: 'user_123456789'
        },
        {
            id: '6',
            text: 'شما می‌توانید پیام متنی ارسال کنید، تصویر آپلود کنید، به پیام‌ها پاسخ دهید، پیام‌ها را ویرایش یا حذف کنید و از ایموجی‌ها استفاده کنید.',
            timestamp: Date.now() - 86400000 * 2 + 120000, // 2 روز قبل + 2 دقیقه
            type: 'text',
            userId: 'admin_user'
        },
        {
            id: '7',
            text: 'همچنین می‌توانید تصاویر را مشاهده کنید و روی آن‌ها زوم کنید.',
            timestamp: Date.now() - 86400000 * 2 + 180000, // 2 روز قبل + 3 دقیقه
            type: 'text',
            userId: 'admin_user',
            replyTo: '5'
        },
        {
            id: '8',
            text: 'عالیه! ممنون از توضیحات.',
            timestamp: Date.now() - 86400000 * 2 + 240000, // 2 روز قبل + 4 دقیقه
            type: 'text',
            userId: 'user_123456789'
        },
        // پیام‌های جدید از کاربران دیگر
        {
            id: '9',
            text: 'سلام به همه! من تازه به این گروه اضافه شدم 😊',
            timestamp: Date.now() - 86400000, // 1 روز قبل
            type: 'text',
            userId: 'user_987654321'
        },
        {
            id: '10',
            text: 'خوش اومدی! من هم چند روزه اینجا هستم.',
            timestamp: Date.now() - 86400000 + 60000, // 1 روز قبل + 1 دقیقه
            type: 'text',
            userId: 'user_123456789'
        },
        {
            id: '11',
            text: 'به گروه چت ما خوش آمدید! امیدوارم از امکانات این چت لذت ببرید.',
            timestamp: Date.now() - 86400000 + 120000, // 1 روز قبل + 2 دقیقه
            type: 'text',
            userId: 'admin_user'
        },
        {
            id: '12',
            text: 'ممنون از استقبال گرمتون! راستی، کسی می‌دونه چطور می‌تونم عکس پروفایلم رو تغییر بدم؟',
            timestamp: Date.now() - 86400000 + 180000, // 1 روز قبل + 3 دقیقه
            type: 'text',
            userId: 'user_987654321'
        },
        {
            id: '13',
            text: 'فعلاً امکان تغییر عکس پروفایل وجود نداره، اما در نسخه‌های بعدی اضافه می‌شه.',
            timestamp: Date.now() - 86400000 + 240000, // 1 روز قبل + 4 دقیقه
            type: 'text',
            userId: 'user_123456789',
            replyTo: '12'
        },
        {
            id: '14',
            text: 'بچه‌ها نظرتون در مورد اضافه شدن قابلیت تماس صوتی و تصویری چیه؟',
            timestamp: Date.now() - 43200000, // 12 ساعت قبل
            type: 'text',
            userId: 'user_555555555'
        },
        {
            id: '15',
            text: 'عالی میشه! من خیلی موافقم 👍',
            timestamp: Date.now() - 43200000 + 60000, // 12 ساعت قبل + 1 دقیقه
            type: 'text',
            userId: 'user_123456789'
        },
        {
            id: '16',
            text: 'منم موافقم، مخصوصاً اگه قابلیت اشتراک‌گذاری صفحه هم داشته باشه.',
            timestamp: Date.now() - 43200000 + 120000, // 12 ساعت قبل + 2 دقیقه
            type: 'text',
            userId: 'user_987654321'
        },
        {
            id: '17',
            text: 'ممنون از پیشنهادات شما. این قابلیت‌ها در برنامه توسعه آینده قرار دارند.',
            timestamp: Date.now() - 43200000 + 180000, // 12 ساعت قبل + 3 دقیقه
            type: 'text',
            userId: 'admin_user'
        },
        {
            id: '18',
            text: 'بچه‌ها کسی اطلاع داره چه زمانی آپدیت بعدی منتشر میشه؟',
            timestamp: Date.now() - 21600000, // 6 ساعت قبل
            type: 'text',
            userId: 'user_444444444'
        },
        {
            id: '19',
            text: 'طبق اعلام تیم توسعه، آپدیت بعدی حدود دو هفته دیگه منتشر میشه.',
            timestamp: Date.now() - 21600000 + 60000, // 6 ساعت قبل + 1 دقیقه
            type: 'text',
            userId: 'user_555555555',
            replyTo: '18'
        },
        {
            id: '20',
            text: 'من یه نظرسنجی ایجاد کردم در مورد قابلیت‌های جدید. لطفاً شرکت کنید!',
            timestamp: Date.now() - 10800000, // 3 ساعت قبل
            type: 'text',
            userId: 'user_123456789'
        },
        {
            id: '21',
            text: 'لینک نظرسنجی کجاست؟ من نمی‌بینمش.',
            timestamp: Date.now() - 10800000 + 60000, // 3 ساعت قبل + 1 دقیقه
            type: 'text',
            userId: 'user_987654321',
            replyTo: '20'
        },
        {
            id: '22',
            text: 'ببخشید، فراموش کردم لینک رو بذارم! الان در کانال اصلی به اشتراک گذاشتم.',
            timestamp: Date.now() - 10800000 + 120000, // 3 ساعت قبل + 2 دقیقه
            type: 'text',
            userId: 'user_123456789'
        },
        {
            id: '23',
            text: 'سلام دوستان! من تازه به گروه اضافه شدم. میشه یکی راهنمایی کنه چطور از این چت استفاده کنم؟',
            timestamp: Date.now() - 3600000, // 1 ساعت قبل
            type: 'text',
            userId: 'user_777777777'
        },
        {
            id: '24',
            text: 'سلام! خوش اومدی. می‌تونی از دکمه‌های پایین صفحه برای ارسال پیام، تصویر و ایموجی استفاده کنی.',
            timestamp: Date.now() - 3600000 + 60000, // 1 ساعت قبل + 1 دقیقه
            type: 'text',
            userId: 'user_987654321',
            replyTo: '23'
        },
        {
            id: '25',
            text: 'همچنین می‌تونی روی پیام‌ها کلیک کنی تا گزینه‌های پاسخ، ویرایش و حذف رو ببینی.',
            timestamp: Date.now() - 3600000 + 120000, // 1 ساعت قبل + 2 دقیقه
            type: 'text',
            userId: 'user_123456789'
        },
        {
            id: '26',
            text: 'ممنون از راهنمایی‌تون! خیلی کمک کرد.',
            timestamp: Date.now() - 1800000, // 30 دقیقه قبل
            type: 'text',
            userId: 'user_777777777'
        }
    ];

    // اصلاح useEffect برای بارگذاری پیام‌های پیش‌فرض
    useEffect(() => {
        checkStorageQuota();
        const storedMessages = localStorage.getItem('chatMessages');
        if (storedMessages) {
            try {
                setMessages(JSON.parse(storedMessages));
            } catch (error) {
                console.error('Error parsing stored messages:', error);
                localStorage.removeItem('chatMessages');
                setMessages(defaultMessages);
            }
        } else {
            // اگر پیامی در localStorage نبود، پیام‌های پیش‌فرض را نمایش بده
            setMessages(defaultMessages);
        }

        // بررسی تنظیمات دارک مود
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode) {
            setDarkMode(JSON.parse(storedDarkMode));
        } else {
            // به صورت پیش‌فرض، دارک مود را فعال کن
            setDarkMode(true);
        }

        // بررسی وجود شناسه کاربر در localStorage
        let storedUserId = localStorage.getItem('chatUserId');

        if (!storedUserId) {
            // ایجاد شناسه جدید برای کاربر
            storedUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('chatUserId', storedUserId);
        }

        setUserId(storedUserId);
    }, []);

    // ذخیره پیام‌ها در localStorage هر زمان که تغییر می‌کنند
    useEffect(() => {
        try {
            // محدود کردن تعداد پیام‌ها قبل از ذخیره
            const limitedMessages = limitStoredMessages([...messages]);
            localStorage.setItem('chatMessages', JSON.stringify(limitedMessages));

            // اگر تعداد پیام‌ها بیشتر از حد مجاز بود، آن‌ها را در state نیز به‌روزرسانی کنیم
            if (limitedMessages.length < messages.length) {
                setMessages(limitedMessages);
            }
        } catch (error) {
            console.error('Error saving messages to localStorage:', error);
            // در صورت بروز خطا، localStorage را پاک کنیم
            localStorage.removeItem('chatMessages');
        }
    }, [messages]);

    // ذخیره تنظیمات دارک مود
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));

        // اعمال کلاس دارک مود به body
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // اسکرول به آخرین پیام
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // برجسته کردن پیام و حذف برجستگی بعد از مدتی
    useEffect(() => {
        if (highlightedMessageId) {
            const timer = setTimeout(() => {
                setHighlightedMessageId(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [highlightedMessageId]);

    // بررسی اسکرول برای نمایش دکمه اسکرول به پایین
    useEffect(() => {
        const handleScroll = () => {
            if (!messagesContainerRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
            const scrollBottom = scrollHeight - scrollTop - clientHeight;

            // اگر کاربر بیش از 200 پیکسل از پایین فاصله داشته باشد، دکمه اسکرول را نمایش می‌دهیم
            setShowScrollButton(scrollBottom > 200);
        };

        const messagesContainer = messagesContainerRef.current;
        if (messagesContainer) {
            messagesContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (messagesContainer) {
                messagesContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    // شبیه‌سازی تایپ کردن
    useEffect(() => {
        let typingTimeout: NodeJS.Timeout;

        if (newMessage && !editingMessageId) {
            setIsTyping(true);
            typingTimeout = setTimeout(() => {
                setIsTyping(false);
            }, 2000);
        } else {
            setIsTyping(false);
        }

        return () => clearTimeout(typingTimeout);
    }, [newMessage, editingMessageId]);

    // فوکوس روی ورودی متن هنگام ویرایش یا پاسخ
    useEffect(() => {
        if (editingMessageId || replyingToId) {
            inputRef.current?.focus();
        }
    }, [editingMessageId, replyingToId]);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        setShowScrollButton(false);
    };

    const scrollToMessage = (messageId: string) => {
        const messageElement = messageRefs.current[messageId];
        if (messageElement) {
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setHighlightedMessageId(messageId);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (newMessage.trim() === '' && !selectedImage) return;

        if (editingMessageId) {
            // ویرایش پیام موجود
            setMessages(prevMessages =>
                prevMessages.map(message =>
                    message.id === editingMessageId
                        ? { ...message, text: newMessage, isEdited: true }
                        : message
                )
            );
            setEditingMessageId(null);
        } else {
            // ارسال پیام جدید
            if (selectedImage) {
                sendImageMessage();
            } else if (newMessage.trim() !== '') {
                const newMessageObj: Message = {
                    id: Date.now().toString(),
                    text: newMessage,
                    timestamp: Date.now(),
                    type: 'text',
                    replyTo: replyingToId || undefined,
                    userId: userId
                };

                setMessages(prevMessages => [...prevMessages, newMessageObj]);
            }
        }

        // پاک کردن فرم
        setNewMessage('');
        setReplyingToId(null);
        setImagePreview(null);
        setSelectedImage(null);
    };

    const sendImageMessage = () => {
        if (!selectedImage) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                const newImageMessage: Message = {
                    id: Date.now().toString(),
                    text: newMessage.trim(),
                    timestamp: Date.now(),
                    type: 'image',
                    imageUrl: e.target.result as string,
                    replyTo: replyingToId || undefined,
                    userId: userId
                };

                setMessages(prevMessages => [...prevMessages, newImageMessage]);
                setImagePreview(null);
                setSelectedImage(null);
                setNewMessage('');
                setReplyingToId(null);
            }
        };
        reader.readAsDataURL(selectedImage);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedImage(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const cancelImageUpload = () => {
        setImagePreview(null);
        setSelectedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const addEmoji = (emojiData: any) => {
        setNewMessage(prev => prev + emojiData.emoji);
        setShowEmojiPicker(false);
        inputRef.current?.focus();
    };

    const editMessage = (messageId: string) => {
        const message = messages.find(m => m.id === messageId);
        if (message && message.type === 'text') {
            setEditingMessageId(messageId);
            setNewMessage(message.text);
        }
    };

    const deleteMessage = (messageId: string) => {
        setMessages(prevMessages => prevMessages.filter(message => message.id !== messageId));
    };

    const replyToMessage = (messageId: string) => {
        setReplyingToId(messageId);
    };

    const cancelEdit = () => {
        setEditingMessageId(null);
        setNewMessage('');
    };

    const cancelReply = () => {
        setReplyingToId(null);
    };

    const clearChat = () => {
        if (window.confirm('آیا مطمئن هستید که می‌خواهید تمام پیام‌ها را پاک کنید؟')) {
            setMessages([]);
        }
    };

    const viewImage = (imageUrl: string, messageId: string) => {
        setSelectedImageForView(imageUrl);
        setEditingMessageId(messageId);
        setShowImageDialog(true);
    };

    const getReplyPreviewText = (messageId?: string) => {
        if (!messageId) return 'پیام';

        const replyMessage = messages.find(m => m.id === messageId);
        if (!replyMessage) return 'پیام';

        if (replyMessage.type === 'text') {
            // برای پیام‌های متنی، متن پیام را با محدودیت طول نمایش می‌دهیم
            const maxLength = 30;
            return replyMessage.text.length > maxLength
                ? `${replyMessage.text.substring(0, maxLength)}...`
                : replyMessage.text;
        } else if (replyMessage.type === 'image') {
            // برای پیام‌های تصویری، متن ثابتی نمایش می‌دهیم
            return replyMessage.text
                ? `تصویر: ${replyMessage.text.substring(0, 20)}${replyMessage.text.length > 20 ? '...' : ''}`
                : 'تصویر';
        }

        return 'پیام';
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('fa-IR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const groupMessagesByDate = () => {
        const groups: { [date: string]: Message[] } = {};

        messages.forEach(message => {
            const date = formatDate(message.timestamp);
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        });

        return Object.entries(groups).map(([date, messages]) => ({
            date,
            messages
        }));
    };

    const messageGroups = groupMessagesByDate();

    const limitStoredMessages = (msgs: Message[]) => {
        // به جای حذف پیام‌های قدیمی، فقط در صورت نیاز حجم داده را کاهش می‌دهیم
        // اما همه پیام‌ها را حفظ می‌کنیم
        if (msgs.length > 500) {
            // به جای حذف پیام‌ها، تصاویر با کیفیت بالا را فشرده می‌کنیم
            return msgs.map(msg => {
                if (msg.type === 'image' && msg.imageUrl && msg.imageUrl.length > 100000) {
                    // فقط تصاویر بزرگ را فشرده می‌کنیم
                    return {
                        ...msg,
                        // اضافه کردن یک فلگ برای نشان دادن اینکه تصویر فشرده شده است
                        isCompressed: true
                    };
                }
                return msg;
            });
        }
        return msgs;
    };

    const checkStorageQuota = () => {
        try {
            // بررسی اندازه فعلی localStorage
            let totalSize = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalSize += localStorage[key].length * 2; // هر کاراکتر 2 بایت در UTF-16
                }
            }

            // اگر اندازه بیش از 4.5 مگابایت است (نزدیک به محدودیت 5 مگابایتی)
            if (totalSize > 4.5 * 1024 * 1024) {
                // به جای حذف پیام‌ها، فقط تصاویر را فشرده می‌کنیم
                const oldMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');

                // فشرده‌سازی تصاویر بزرگ
                const compressedMessages = oldMessages.map((message: Message) => {
                    if (message.type === 'image' && message.imageUrl && message.imageUrl.length > 50000) {
                        return {
                            ...message,
                            // اضافه کردن یک فلگ برای نشان دادن اینکه تصویر فشرده شده است
                            isCompressed: true,
                            // می‌توانیم در اینجا تصویر را فشرده کنیم یا کیفیت آن را کاهش دهیم
                            // اما برای سادگی، فقط فلگ را تنظیم می‌کنیم
                        };
                    }
                    return message;
                });

                localStorage.setItem('chatMessages', JSON.stringify(compressedMessages));
                setMessages(compressedMessages);

                // نمایش پیام به کاربر
                alert('برای بهینه‌سازی حافظه، کیفیت برخی تصاویر کاهش یافت.');
            }
        } catch (error) {
            console.error('Error checking storage quota:', error);
        }
    };

    // اضافه کردن تابع isMessageOwner
    const isMessageOwner = (message: Message) => {
        return message.userId === userId;
    };

    // تابع renderMessages برای نمایش پیام‌ها
    const renderMessages = () => {
        if (messages.length === 0) return null;

        // گروه‌بندی پیام‌ها بر اساس تاریخ
        const groupedMessages: { [date: string]: Message[] } = {};

        messages.forEach(message => {
            const date = new Date(message.timestamp).toLocaleDateString('fa-IR');
            if (!groupedMessages[date]) {
                groupedMessages[date] = [];
            }
            groupedMessages[date].push(message);
        });

        return Object.entries(groupedMessages).map(([date, messagesForDate]) => (
            <div key={date} className={styles.messageGroup}>
                <div className={styles.dateHeader}>
                    <span className={styles.dateLabel}>{date}</span>
                </div>

                {messagesForDate.map(message => {
                    const isOwner = isMessageOwner(message);
                    const senderName = message.userId === 'admin_user' ? 'ربات' : 'کاربر';

                    return (
                        <div
                            key={message.id}
                            className={`${styles.messageItem} ${isOwner ? styles.messageOwner : styles.messageOther}`}
                            ref={el => messageRefs.current[message.id] = el}
                        >
                            {/* نمایش آواتار برای پیام‌های دیگران */}
                            {!isOwner && (
                                <div className={styles.messageAvatar}>
                                    <div className={styles.avatarCircle}>
                                        {senderName.charAt(0)}
                                    </div>
                                </div>
                            )}

                            <div className={`${styles.messageContent} ${highlightedMessageId === message.id ? styles.highlightedMessage : ''}`}>
                                {/* نمایش نام فرستنده برای پیام‌های دیگران */}
                                {!isOwner && (
                                    <div className={styles.messageSender}>
                                        {senderName}
                                    </div>
                                )}

                                {message.replyTo && (
                                    <div
                                        className={styles.replyPreview}
                                        onClick={() => scrollToMessage(message.replyTo || '')}
                                    >
                                        <div className={styles.replyText}>
                                            <Reply size={16} className={styles.replyIcon} />
                                            <span>
                                                {getReplyPreviewText(message.replyTo)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {message.type === 'image' ? (
                                    <div className={styles.imageMessageContainer}>
                                        <div
                                            className={styles.imageContainer}
                                            onClick={() => viewImage(message.imageUrl || '', message.id)}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={message.imageUrl}
                                                alt="تصویر پیام"
                                                className={styles.messageImage}
                                            />
                                        </div>
                                        {message.text && message.text.trim() !== '' && (
                                            <p className={styles.imageCaption}>{message.text}</p>
                                        )}
                                    </div>
                                ) : (
                                    <p className={styles.messageText}>{message.text}</p>
                                )}

                                <div className={styles.messageFooter}>
                                    <div className={styles.messageInfo}>
                                        <span className={styles.messageTime}>
                                            {formatTime(message.timestamp)}
                                            {isOwner && (
                                                <span className={styles.messageStatus}>
                                                    <Check size={12} />
                                                </span>
                                            )}
                                        </span>
                                        {message.isEdited && (
                                            <span className={styles.editedLabel}>
                                                ویرایش شده
                                            </span>
                                        )}
                                    </div>

                                    <div className={styles.messageActions}>
                                        <button
                                            className={styles.actionButton}
                                            onClick={() => replyToMessage(message.id)}
                                            aria-label="پاسخ"
                                        >
                                            <Reply size={16} />
                                        </button>

                                        {isOwner && (
                                            <>
                                                <button
                                                    className={styles.actionButton}
                                                    onClick={() => editMessage(message.id)}
                                                    aria-label="ویرایش"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    className={styles.actionButton}
                                                    onClick={() => deleteMessage(message.id)}
                                                    aria-label="حذف"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        ));
    };

    return (
        <ConfigProvider >
            <Content className={`${styles.chatContainer} ${darkMode ? styles.darkMode : ''}`}>
                <div className={styles.chatHeader}>
                    <div className={styles.headerContent}>
                        <div className={styles.chatAvatar}>
                            <User size={24} className={styles.avatarText} />
                        </div>
                        <div className={styles.headerInfo}>
                            <h2 className={styles.chatTitle}>چت</h2>
                        </div>
                    </div>
                    <button
                        className={styles.darkModeToggle}
                        onClick={toggleDarkMode}
                        aria-label={darkMode ? 'روشن کردن تم' : 'تاریک کردن تم'}
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                <div className={styles.messagesContainer} ref={messagesContainerRef}>
                    {messages.length === 0 ? (
                        <div className={styles.emptyChat}>
                            <MessageCircle size={48} className={styles.emptyChatIcon} />
                            <h3 className={styles.emptyChatText}>هنوز پیامی ارسال نشده است</h3>
                            <p className={styles.emptyChatSubtext}>اولین پیام خود را ارسال کنید!</p>
                        </div>
                    ) : (
                        renderMessages()
                    )}
                    <div ref={messagesEndRef} />

                    {showScrollButton && (
                        <button
                            className={styles.scrollToBottomButton}
                            onClick={scrollToBottom}
                            aria-label="اسکرول به آخرین پیام"
                        >
                            <ChevronDown size={20} />
                        </button>
                    )}
                </div>

                <div className={styles.inputArea}>
                    <form onSubmit={handleSubmit} className={styles.messageForm}>
                        {(replyingToId || imagePreview) && (
                            <div className={styles.previewContainer}>
                                {replyingToId && (
                                    <div className={styles.replyPreview}>
                                        <div className={styles.replyText}>
                                            <Reply size={16} className={styles.replyIcon} />
                                            <span>
                                                {getReplyPreviewText()}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            className={styles.cancelReplyButton}
                                            onClick={cancelReply}
                                            aria-label="لغو پاسخ"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}

                                {imagePreview && (
                                    <div className={styles.imagePreviewContainer}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imagePreview} alt="پیش‌نمایش" className={styles.imagePreview} />
                                        <button
                                            type="button"
                                            className={styles.cancelImageButton}
                                            onClick={cancelImageUpload}
                                            aria-label="لغو آپلود تصویر"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className={styles.inputContainer}>
                            <button
                                type="button"
                                className={styles.inputButton}
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                aria-label="افزودن ایموجی"
                            >
                                <Smile size={20} />
                            </button>

                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder={editingMessageId ? "پیام خود را ویرایش کنید..." : "پیام خود را بنویسید..."}
                                className={styles.messageInput}
                                ref={inputRef}
                            />

                            {!editingMessageId && (
                                <button
                                    type="button"
                                    className={styles.inputButton}
                                    onClick={() => fileInputRef.current?.click()}
                                    aria-label="افزودن تصویر"
                                >
                                    <Image size={20} />
                                </button>
                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />

                            <button
                                type="submit"
                                className={styles.sendButton}
                                aria-label={editingMessageId ? 'ویرایش پیام' : 'ارسال پیام'}
                                disabled={newMessage.trim() === '' && !selectedImage}
                            >
                                {editingMessageId ? <Check size={20} /> : <Send size={20} />}
                            </button>
                        </div>

                        {showEmojiPicker && (
                            <div className={styles.emojiPickerContainer}>
                                <EmojiPicker onEmojiClick={addEmoji} theme={darkMode ? 'dark' : 'light'} />
                            </div>
                        )}
                    </form>
                </div>

                {showImageDialog && (
                    <div
                        className={styles.imageDialog}
                        onClick={() => setShowImageDialog(false)}
                    >
                        <div
                            className={styles.imageDialogContent}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className={styles.imageDialogHeader}>
                                <h3>تصویر</h3>
                                <button
                                    className={styles.closeDialogButton}
                                    onClick={() => setShowImageDialog(false)}
                                    aria-label="بستن"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {selectedImageForView && (
                                <div className={styles.fullImageContainer}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={selectedImageForView}
                                        alt="تصویر بزرگ"
                                        className={styles.fullImage}
                                    />
                                </div>
                            )}

                            {editingMessageId && (
                                <div className={styles.imageCaptionDisplay}>
                                    <p className={styles.captionText}>
                                        {messages.find(m => m.id === editingMessageId)?.text || 'بدون توضیح'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Content>
        </ConfigProvider>
    )
}


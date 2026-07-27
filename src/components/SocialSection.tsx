import React, { useState, useEffect } from 'react';
import {
  Facebook,
  Instagram,
  Heart,
  MessageCircle,
  Share2,
  Send,
  ThumbsUp,
  Globe,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Bookmark,
  MoreHorizontal,
  Flame,
  Radio
} from 'lucide-react';
import { INITIAL_SOCIAL_POSTS, RESTAURANT_INFO } from '../data/restaurantData';
import { SocialPost, PostComment } from '../types';
import { getImage } from '../utils/imageStore';
import pan1Img from '../assets/pan1.jpg';
import pan2Img from '../assets/pan2.jpg';
import mamaImg from '../assets/mama.png';
import abuelaImg from '../assets/abuela.jpg';

export const SocialSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'widget' | 'facebook' | 'instagram'>('all');
  const [posts, setPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_POSTS);
  const [newCommentText, setNewCommentText] = useState<{ [postId: string]: string }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Load Tagembed Widget script
    const script = document.createElement('script');
    script.src = 'https://widget.tagembed.com/embed.min.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleToggleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const comment = newCommentText[postId]?.trim();
    if (!comment) return;

    const newCommentObj: PostComment = {
      id: 'comment-' + Date.now(),
      author: 'Cliente de Usulután',
      text: comment,
      timeAgo: 'Justo ahora',
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments + 1,
            commentsList: [...(post.commentsList || []), newCommentObj],
          };
        }
        return post;
      })
    );

    setNewCommentText((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleShare = (postId: string) => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(postId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'facebook') return post.platform === 'facebook';
    if (activeFilter === 'instagram') return post.platform === 'instagram';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-orange-950/50 to-zinc-900 border border-orange-500/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-600/20 border border-orange-500/40 rounded-full text-orange-400 text-xs font-black uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 animate-pulse text-orange-500" />
              <span>Feeds en Vivo & Noticias</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Nuestras <span className="text-orange-500">Redes Sociales</span>
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-medium">
              Sigue todas las noticias oficiales, promociones de los sábados, opiniones de clientes y las mejores fotografías de nuestros Panes con Gallina Benítez en Usulután Este.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={RESTAURANT_INFO.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              <Facebook className="w-4 h-4" />
              <span>Página de Facebook</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              href={RESTAURANT_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-pink-600/20 flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram Oficial</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* Tagembed Widget Full Width Block */}
      <div className="bg-zinc-900 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-tight">
              Feed En Vivo Integrado (Tagembed Widget #331019)
            </h2>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
            Live Stream
          </span>
        </div>

        <div
          className="tagembed-widget rounded-2xl overflow-hidden border border-zinc-800 bg-black min-h-[500px]"
          style={{ width: '100%', height: '100%', minHeight: '500px', overflow: 'auto' }}
          data-widget-id="331019"
          data-website="1"
        ></div>
      </div>

      {/* Bottom Community CTA */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-black rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            ¿Disfrutaste tu Pan con Gallina?
          </h3>
          <p className="text-xs sm:text-sm font-semibold opacity-90">
            Sube tu foto a Instagram o Facebook usando <strong className="underline">#PanesBenitezUsulutan</strong> y etiquétanos para aparecer en nuestras historias oficiales.
          </p>
        </div>

        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hola!%20Les%20mando%20mi%20foto%20para%20las%20redes%20sociales`}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 bg-black text-orange-400 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-zinc-900 transition-colors shrink-0 shadow-lg"
        >
          Enviar Foto por WhatsApp
        </a>
      </div>
    </div>
  );
};

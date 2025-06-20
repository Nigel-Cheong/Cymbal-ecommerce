import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { useCart } from './hooks/useCart';
import { Header } from './components/header';
import { MainContent } from './components/mainContent';
import { Footer } from './components/footer';
import { doc, getDoc, getDocs, where, orderBy, limit } from "firebase/firestore";


// import "./App.css";
// Main App component
function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const { cartItems, cartItemCount, handleAddToCart, handleUpdateQuantity, handleRemoveItem } = useCart();

  // Firebase State
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [firestoreProducts, setFirestoreProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Initialize Firebase and set up auth listener
  useEffect(() => {
    // Retrieve environment variables from .env file
    const appId = process.env.REACT_APP_APP_ID || 'default-app-id';
    // const firebaseConfigString = process.env.REACT_APP_FIREBASE_CONFIG || '{}';
    const initialAuthToken = process.env.REACT_APP_INITIAL_AUTH_TOKEN;

    let firebaseConfig;
    try {
      firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID
      };
    } catch (e) {
      console.error("Error parsing REACT_APP_FIREBASE_CONFIG:", e);
      firebaseConfig = {}; // Fallback to empty config
    }

    // Ensure firebaseConfig is not empty before initializing
    if (!firebaseConfig || Object.keys(firebaseConfig).length === 0) {
      console.error("Firebase configuration is missing or invalid. Please check your .env file.");
      setLoadingProducts(false); // Stop loading if Firebase can't be initialized
      return;
    }

    const app = initializeApp(firebaseConfig);
    const firestoreDb = getFirestore(app);
    const firebaseAuth = getAuth(app);

    setDb(firestoreDb);
    setAuth(firebaseAuth);

    const unsubscribeAuth = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        // Sign in anonymously if no user is authenticated
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(firebaseAuth, initialAuthToken);
          } else {
            await signInAnonymously(firebaseAuth);
          }
          setUserId(firebaseAuth.currentUser?.uid || crypto.randomUUID());
        } catch (error) {
          console.error("Error signing in anonymously:", error);
          setUserId(crypto.randomUUID());
        }
      }
      setIsAuthReady(true);
    });

    return () => {
      unsubscribeAuth();
    };
  }, []); // Empty dependency array means this runs once on mount

  // Fetch products from Firestore once authenticated and db is ready
  useEffect(() => {
    // const productsRef = db.collection('products');
    // console.log(productsRef)
    if (isAuthReady && db && userId) { // Ensure userId is available before fetching
      setLoadingProducts(true);
      // Use the actual appId from the environment variable for the collection path
      const productsCollectionRef = collection(db, "products");
      const q = query(productsCollectionRef);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFirestoreProducts(productsData);
        setLoadingProducts(false);
      }, (error) => {
        console.error("Error fetching products:", error);
        setLoadingProducts(false);
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    }
  }, [isAuthReady, db, userId]); // Re-run when auth is ready, db instance, or userId changes

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
      <Header cartItemCount={cartItemCount} onNavigate={handleNavigate} />
      {userId && (
        <div className="text-center bg-gray-200 text-gray-700 py-2 text-sm">
          Authenticated User ID: <span className="font-mono text-xs break-all">{userId}</span>
        </div>
      )}
      <MainContent
        currentPage={currentPage}
        products={firestoreProducts}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onNavigate={handleNavigate}
        loadingProducts={loadingProducts}
      />
      <Footer />
    </div>
  );
}

export default App;
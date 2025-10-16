// Cross-platform haptics helper: Web Vibration API (Android) + Capacitor/Cordova (iOS/Android)

export function triggerLightHaptic() {
  try {
    // 1) Web Vibration API (mostly Android browsers)
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate([10, 30]);
      return;
    }

    // 2) Capacitor Haptics (if running inside native shell)
    const cap = typeof window !== 'undefined' ? window.Capacitor : undefined;
    const capHaptics = cap?.Plugins?.Haptics || cap?.Haptics; // support different Capacitor versions
    if (cap && capHaptics && typeof capHaptics.impact === 'function') {
      capHaptics.impact({ style: 'light' });
      return;
    }

    // 3) Cordova TapticEngine (optional legacy)
    const taptic = typeof window !== 'undefined' ? (window.TapticEngine || window?.cordova?.plugins?.TapticEngine) : undefined;
    if (taptic && typeof taptic.impact === 'function') {
      taptic.impact({ style: 'light' });
      return;
    }
  } catch (e) {
    // no-op
  }
}



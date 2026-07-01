/**
 * Recommendation Engine Module
 * Rule-based smart filtering that matches user profile against scheme eligibility.
 * Returns match score (0-100) and list of matched / unmatched criteria per scheme.
 */

/**
 * Compute match score between a user profile and a single scheme.
 * @param {object} profile - User's profile
 * @param {object} scheme - Scheme document
 * @returns {{score:number, matched:string[], missing:string[], eligible:boolean}}
 */
const scoreScheme = (profile, scheme) => {
  const el = scheme.eligibility || {};
  const matched = [];
  const missing = [];
  let totalCriteria = 0;
  let passedCriteria = 0;
  let hardFail = false;

  // Age check
  if (el.minAge != null || el.maxAge != null) {
    totalCriteria++;
    if (profile.age == null) {
      missing.push('Age not provided in profile');
    } else {
      const okMin = el.minAge == null || profile.age >= el.minAge;
      const okMax = el.maxAge == null || profile.age <= el.maxAge;
      if (okMin && okMax) {
        passedCriteria++;
        matched.push(`Age ${profile.age} within eligible range`);
      } else {
        hardFail = true;
        missing.push(
          `Age must be ${el.minAge || 0}-${el.maxAge || '∞'} (yours: ${profile.age})`
        );
      }
    }
  }

  // Gender check
  if (Array.isArray(el.gender) && el.gender.length > 0) {
    totalCriteria++;
    if (!profile.gender) {
      missing.push('Gender not provided');
    } else if (el.gender.includes(profile.gender)) {
      passedCriteria++;
      matched.push(`Gender eligibility met (${profile.gender})`);
    } else {
      hardFail = true;
      missing.push(`Only for: ${el.gender.join(', ')}`);
    }
  }

  // Income check
  if (el.maxIncome != null) {
    totalCriteria++;
    if (profile.annualIncome == null) {
      missing.push('Annual income not provided');
    } else if (profile.annualIncome <= el.maxIncome) {
      passedCriteria++;
      matched.push(`Income within limit (₹${el.maxIncome.toLocaleString('en-IN')})`);
    } else {
      hardFail = true;
      missing.push(
        `Income limit ₹${el.maxIncome.toLocaleString('en-IN')} exceeded`
      );
    }
  }

  // Occupation check
  if (Array.isArray(el.occupations) && el.occupations.length > 0) {
    totalCriteria++;
    if (!profile.occupation) {
      missing.push('Occupation not provided');
    } else if (
      el.occupations
        .map((o) => o.toLowerCase())
        .includes(profile.occupation.toLowerCase())
    ) {
      passedCriteria++;
      matched.push(`Occupation matches (${profile.occupation})`);
    } else {
      hardFail = true;
      missing.push(`Only for: ${el.occupations.join(', ')}`);
    }
  }

  // Education check
  if (Array.isArray(el.education) && el.education.length > 0) {
    totalCriteria++;
    if (!profile.education) {
      missing.push('Education not provided');
    } else if (
      el.education
        .map((e) => e.toLowerCase())
        .includes(profile.education.toLowerCase())
    ) {
      passedCriteria++;
      matched.push(`Education matches (${profile.education})`);
    } else {
      hardFail = true;
      missing.push(`Only for: ${el.education.join(', ')}`);
    }
  }

  // State check
  if (Array.isArray(el.states) && el.states.length > 0) {
    totalCriteria++;
    if (!profile.state) {
      missing.push('State not provided');
    } else if (
      el.states
        .map((s) => s.toLowerCase())
        .includes(profile.state.toLowerCase())
    ) {
      passedCriteria++;
      matched.push(`Available in ${profile.state}`);
    } else {
      hardFail = true;
      missing.push(`Only in: ${el.states.join(', ')}`);
    }
  }

  // Category check (SC/ST/OBC/EWS/General)
  if (Array.isArray(el.categories) && el.categories.length > 0) {
    totalCriteria++;
    if (!profile.category) {
      missing.push('Category not provided');
    } else if (el.categories.includes(profile.category)) {
      passedCriteria++;
      matched.push(`Category matches (${profile.category})`);
    } else {
      hardFail = true;
      missing.push(`Only for: ${el.categories.join(', ')}`);
    }
  }

  // Disability required
  if (el.disabilityRequired) {
    totalCriteria++;
    if (profile.disability === true) {
      passedCriteria++;
      matched.push('Disability eligibility met');
    } else {
      hardFail = true;
      missing.push('Requires disability certification');
    }
  }

  // Marital status
  if (Array.isArray(el.maritalStatus) && el.maritalStatus.length > 0) {
    totalCriteria++;
    if (!profile.maritalStatus) {
      missing.push('Marital status not provided');
    } else if (el.maritalStatus.includes(profile.maritalStatus)) {
      passedCriteria++;
      matched.push(`Marital status matches`);
    } else {
      hardFail = true;
      missing.push(`Only for: ${el.maritalStatus.join(', ')}`);
    }
  }

  // If scheme has no criteria at all, it's universally applicable
  if (totalCriteria === 0) {
    return {
      score: 70,
      matched: ['General scheme - open to all citizens'],
      missing: [],
      eligible: true,
    };
  }

  const score = Math.round((passedCriteria / totalCriteria) * 100);
  return {
    score,
    matched,
    missing,
    eligible: !hardFail && passedCriteria === totalCriteria,
  };
};

/**
 * Rank all active schemes for a user profile.
 * @param {object} profile
 * @param {Array} schemes
 * @returns {Array} - Sorted list of { scheme, score, matched, missing, eligible }
 */
const recommendSchemes = (profile, schemes) => {
  const results = schemes.map((scheme) => {
    const { score, matched, missing, eligible } = scoreScheme(profile, scheme);
    return {
      scheme,
      score,
      matched,
      missing,
      eligible,
    };
  });
  // Sort: eligible first, then by score desc
  results.sort((a, b) => {
    if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
    return b.score - a.score;
  });
  return results;
};

module.exports = { scoreScheme, recommendSchemes };

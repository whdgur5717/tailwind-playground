//output from @tailwindcss/browser
;(() => {
	var Mt = "4.1.3"
	var Ee = 92,
		Le = 47,
		Me = 42,
		Ao = 34,
		Co = 39,
		No = 58,
		Be = 59,
		ge = 10,
		Re = 32,
		We = 9,
		Bt = 123,
		ht = 125,
		wt = 40,
		Wt = 41,
		$o = 91,
		So = 93,
		qt = 45,
		kt = 64,
		To = 33
	function Ae(t) {
		t[0] === "\uFEFF" && (t = t.slice(1)),
			(t = t.replaceAll(
				`\r
`,
				`
`,
			))
		let r = [],
			o = [],
			e = [],
			i = null,
			s = null,
			a = "",
			d = "",
			u
		for (let c = 0; c < t.length; c++) {
			const g = t.charCodeAt(c)
			if (g === Ee) (a += t.slice(c, c + 2)), (c += 1)
			else if (g === Le && t.charCodeAt(c + 1) === Me) {
				const m = c
				for (let k = c + 2; k < t.length; k++)
					if (((u = t.charCodeAt(k)), u === Ee)) k += 1
					else if (u === Me && t.charCodeAt(k + 1) === Le) {
						c = k + 1
						break
					}
				const h = t.slice(m, c + 1)
				h.charCodeAt(2) === To && o.push(qe(h.slice(2, -2)))
			} else if (g === Co || g === Ao) {
				const m = c
				for (let h = c + 1; h < t.length; h++)
					if (((u = t.charCodeAt(h)), u === Ee)) h += 1
					else if (u === g) {
						c = h
						break
					} else {
						if (u === Be && t.charCodeAt(h + 1) === ge)
							throw new Error(
								`Unterminated string: ${t.slice(m, h + 1) + String.fromCharCode(g)}`,
							)
						if (u === ge)
							throw new Error(
								`Unterminated string: ${t.slice(m, h) + String.fromCharCode(g)}`,
							)
					}
				a += t.slice(m, c + 1)
			} else {
				if (
					(g === Re || g === ge || g === We) &&
					(u = t.charCodeAt(c + 1)) &&
					(u === Re || u === ge || u === We)
				)
					continue
				if (g === ge) {
					if (a.length === 0) continue
					;(u = a.charCodeAt(a.length - 1)),
						u !== Re && u !== ge && u !== We && (a += " ")
				} else if (g === qt && t.charCodeAt(c + 1) === qt && a.length === 0) {
					let m = "",
						h = c,
						k = -1
					for (let A = c + 2; A < t.length; A++)
						if (((u = t.charCodeAt(A)), u === Ee)) A += 1
						else if (u === Le && t.charCodeAt(A + 1) === Me) {
							for (let y = A + 2; y < t.length; y++)
								if (((u = t.charCodeAt(y)), u === Ee)) y += 1
								else if (u === Me && t.charCodeAt(y + 1) === Le) {
									A = y + 1
									break
								}
						} else if (k === -1 && u === No) k = a.length + A - h
						else if (u === Be && m.length === 0) {
							;(a += t.slice(h, A)), (c = A)
							break
						} else if (u === wt) m += ")"
						else if (u === $o) m += "]"
						else if (u === Bt) m += "}"
						else if ((u === ht || t.length - 1 === A) && m.length === 0) {
							;(c = A - 1), (a += t.slice(h, A))
							break
						} else
							(u === Wt || u === So || u === ht) &&
								m.length > 0 &&
								t[A] === m[m.length - 1] &&
								(m = m.slice(0, -1))
					const v = vt(a, k)
					if (!v) throw new Error("Invalid custom property, expected a value")
					i ? i.nodes.push(v) : r.push(v), (a = "")
				} else if (g === Be && a.charCodeAt(0) === kt)
					(s = Oe(a)), i ? i.nodes.push(s) : r.push(s), (a = ""), (s = null)
				else if (g === Be && d[d.length - 1] !== ")") {
					const m = vt(a)
					if (!m)
						throw a.length === 0
							? new Error("Unexpected semicolon")
							: new Error(`Invalid declaration: \`${a.trim()}\``)
					i ? i.nodes.push(m) : r.push(m), (a = "")
				} else if (g === Bt && d[d.length - 1] !== ")")
					(d += "}"),
						(s = M(a.trim())),
						i && i.nodes.push(s),
						e.push(i),
						(i = s),
						(a = ""),
						(s = null)
				else if (g === ht && d[d.length - 1] !== ")") {
					if (d === "") throw new Error("Missing opening {")
					if (((d = d.slice(0, -1)), a.length > 0))
						if (a.charCodeAt(0) === kt)
							(s = Oe(a)), i ? i.nodes.push(s) : r.push(s), (a = ""), (s = null)
						else {
							const h = a.indexOf(":")
							if (i) {
								const k = vt(a, h)
								if (!k) throw new Error(`Invalid declaration: \`${a.trim()}\``)
								i.nodes.push(k)
							}
						}
					const m = e.pop() ?? null
					m === null && i && r.push(i), (i = m), (a = ""), (s = null)
				} else if (g === wt) (d += ")"), (a += "(")
				else if (g === Wt) {
					if (d[d.length - 1] !== ")") throw new Error("Missing opening (")
					;(d = d.slice(0, -1)), (a += ")")
				} else {
					if (a.length === 0 && (g === Re || g === ge || g === We)) continue
					a += String.fromCharCode(g)
				}
			}
		}
		if ((a.charCodeAt(0) === kt && r.push(Oe(a)), d.length > 0 && i)) {
			if (i.kind === "rule")
				throw new Error(`Missing closing } at ${i.selector}`)
			if (i.kind === "at-rule")
				throw new Error(`Missing closing } at ${i.name} ${i.params}`)
		}
		return o.length > 0 ? o.concat(r) : r
	}
	function Oe(t, r = []) {
		for (let o = 5; o < t.length; o++) {
			const e = t.charCodeAt(o)
			if (e === Re || e === wt) {
				const i = t.slice(0, o).trim(),
					s = t.slice(o).trim()
				return D(i, s, r)
			}
		}
		return D(t.trim(), "", r)
	}
	function vt(t, r = t.indexOf(":")) {
		if (r === -1) return null
		const o = t.indexOf("!important", r + 1)
		return l(
			t.slice(0, r).trim(),
			t.slice(r + 1, o === -1 ? t.length : o).trim(),
			o !== -1,
		)
	}
	function ce(t) {
		if (arguments.length === 0)
			throw new TypeError("`CSS.escape` requires an argument.")
		let r = String(t),
			o = r.length,
			e = -1,
			i,
			s = "",
			a = r.charCodeAt(0)
		if (o === 1 && a === 45) return "\\" + r
		while (++e < o) {
			if (((i = r.charCodeAt(e)), i === 0)) {
				s += "\uFFFD"
				continue
			}
			if (
				(i >= 1 && i <= 31) ||
				i === 127 ||
				(e === 0 && i >= 48 && i <= 57) ||
				(e === 1 && i >= 48 && i <= 57 && a === 45)
			) {
				s += "\\" + i.toString(16) + " "
				continue
			}
			if (
				i >= 128 ||
				i === 45 ||
				i === 95 ||
				(i >= 48 && i <= 57) ||
				(i >= 65 && i <= 90) ||
				(i >= 97 && i <= 122)
			) {
				s += r.charAt(e)
				continue
			}
			s += "\\" + r.charAt(e)
		}
		return s
	}
	function he(t) {
		return t.replace(/\\([\dA-Fa-f]{1,6}[\t\n\f\r ]?|[\S\s])/g, (r) =>
			r.length > 2
				? String.fromCodePoint(Number.parseInt(r.slice(1).trim(), 16))
				: r[1],
		)
	}
	var Gt = new Map([
		["--font", ["--font-weight", "--font-size"]],
		["--inset", ["--inset-shadow", "--inset-ring"]],
		[
			"--text",
			[
				"--text-color",
				"--text-decoration-color",
				"--text-decoration-thickness",
				"--text-indent",
				"--text-shadow",
				"--text-underline-offset",
			],
		],
	])
	function Ht(t, r) {
		return (Gt.get(r) ?? []).some((o) => t === o || t.startsWith(`${o}-`))
	}
	var He = class {
		constructor(r = new Map(), o = new Set([])) {
			this.values = r
			this.keyframes = o
		}
		prefix = null
		add(r, o, e = 0) {
			if (r.endsWith("-*")) {
				if (o !== "initial")
					throw new Error(`Invalid theme value \`${o}\` for namespace \`${r}\``)
				r === "--*"
					? this.values.clear()
					: this.clearNamespace(r.slice(0, -2), 0)
			}
			if (e & 4) {
				const i = this.values.get(r)
				if (i && !(i.options & 4)) return
			}
			o === "initial"
				? this.values.delete(r)
				: this.values.set(r, { value: o, options: e })
		}
		keysInNamespaces(r) {
			const o = []
			for (const e of r) {
				const i = `${e}-`
				for (const s of this.values.keys())
					s.startsWith(i) &&
						s.indexOf("--", 2) === -1 &&
						(Ht(s, e) || o.push(s.slice(i.length)))
			}
			return o
		}
		get(r) {
			for (const o of r) {
				const e = this.values.get(o)
				if (e) return e.value
			}
			return null
		}
		hasDefault(r) {
			return (this.getOptions(r) & 4) === 4
		}
		getOptions(r) {
			return (r = he(this.#r(r))), this.values.get(r)?.options ?? 0
		}
		entries() {
			return this.prefix
				? Array.from(this.values, (r) => ((r[0] = this.prefixKey(r[0])), r))
				: this.values.entries()
		}
		prefixKey(r) {
			return this.prefix ? `--${this.prefix}-${r.slice(2)}` : r
		}
		#r(r) {
			return this.prefix ? `--${r.slice(3 + this.prefix.length)}` : r
		}
		clearNamespace(r, o) {
			const e = Gt.get(r) ?? []
			e: for (const i of this.values.keys())
				if (i.startsWith(r)) {
					if (o !== 0 && (this.getOptions(i) & o) !== o) continue
					for (const s of e) if (i.startsWith(s)) continue e
					this.values.delete(i)
				}
		}
		#e(r, o) {
			for (const e of o) {
				let i = r !== null ? `${e}-${r}` : e
				if (!this.values.has(i))
					if (r !== null && r.includes(".")) {
						if (((i = `${e}-${r.replaceAll(".", "_")}`), !this.values.has(i)))
							continue
					} else continue
				if (!Ht(i, e)) return i
			}
			return null
		}
		#t(r) {
			const o = this.values.get(r)
			if (!o) return null
			let e = null
			return (
				o.options & 2 && (e = o.value),
				`var(${ce(this.prefixKey(r))}${e ? `, ${e}` : ""})`
			)
		}
		markUsedVariable(r) {
			const o = he(this.#r(r)),
				e = this.values.get(o)
			if (!e) return !1
			const i = e.options & 16
			return (e.options |= 16), !i
		}
		resolve(r, o, e = 0) {
			const i = this.#e(r, o)
			if (!i) return null
			const s = this.values.get(i)
			return (e | s.options) & 1 ? s.value : this.#t(i)
		}
		resolveValue(r, o) {
			const e = this.#e(r, o)
			return e ? this.values.get(e).value : null
		}
		resolveWith(r, o, e = []) {
			const i = this.#e(r, o)
			if (!i) return null
			const s = {}
			for (const d of e) {
				const u = `${i}${d}`,
					c = this.values.get(u)
				c && (c.options & 1 ? (s[d] = c.value) : (s[d] = this.#t(u)))
			}
			const a = this.values.get(i)
			return a.options & 1 ? [a.value, s] : [this.#t(i), s]
		}
		namespace(r) {
			const o = new Map(),
				e = `${r}-`
			for (const [i, s] of this.values)
				i === r
					? o.set(null, s.value)
					: i.startsWith(`${e}-`)
						? o.set(i.slice(r.length), s.value)
						: i.startsWith(e) && o.set(i.slice(e.length), s.value)
			return o
		}
		addKeyframes(r) {
			this.keyframes.add(r)
		}
		getKeyframes() {
			return Array.from(this.keyframes)
		}
	}
	var q = class extends Map {
		constructor(o) {
			super()
			this.factory = o
		}
		get(o) {
			let e = super.get(o)
			return e === void 0 && ((e = this.factory(o, this)), this.set(o, e)), e
		}
	}
	function yt(t) {
		return { kind: "word", value: t }
	}
	function Vo(t, r) {
		return { kind: "function", value: t, nodes: r }
	}
	function Eo(t) {
		return { kind: "separator", value: t }
	}
	function te(t, r, o = null) {
		for (let e = 0; e < t.length; e++) {
			let i = t[e],
				s = !1,
				a = 0,
				d =
					r(i, {
						parent: o,
						replaceWith(u) {
							s ||
								((s = !0),
								Array.isArray(u)
									? u.length === 0
										? (t.splice(e, 1), (a = 0))
										: u.length === 1
											? ((t[e] = u[0]), (a = 1))
											: (t.splice(e, 1, ...u), (a = u.length))
									: (t[e] = u))
						},
					}) ?? 0
			if (s) {
				d === 0 ? e-- : (e += a - 1)
				continue
			}
			if (d === 2) return 2
			if (d !== 1 && i.kind === "function" && te(i.nodes, r, i) === 2) return 2
		}
	}
	function J(t) {
		let r = ""
		for (const o of t)
			switch (o.kind) {
				case "word":
				case "separator": {
					r += o.value
					break
				}
				case "function":
					r += o.value + "(" + J(o.nodes) + ")"
			}
		return r
	}
	var Yt = 92,
		Ro = 41,
		Jt = 58,
		Qt = 44,
		Oo = 34,
		Zt = 61,
		Xt = 62,
		er = 60,
		tr = 10,
		Po = 40,
		_o = 39,
		rr = 47,
		or = 32,
		ir = 9
	function H(t) {
		t = t.replaceAll(
			`\r
`,
			`
`,
		)
		let r = [],
			o = [],
			e = null,
			i = "",
			s
		for (let a = 0; a < t.length; a++) {
			const d = t.charCodeAt(a)
			switch (d) {
				case Yt: {
					;(i += t[a] + t[a + 1]), a++
					break
				}
				case Jt:
				case Qt:
				case Zt:
				case Xt:
				case er:
				case tr:
				case rr:
				case or:
				case ir: {
					if (i.length > 0) {
						const m = yt(i)
						e ? e.nodes.push(m) : r.push(m), (i = "")
					}
					let u = a,
						c = a + 1
					for (
						;
						c < t.length &&
						((s = t.charCodeAt(c)),
						!(
							s !== Jt &&
							s !== Qt &&
							s !== Zt &&
							s !== Xt &&
							s !== er &&
							s !== tr &&
							s !== rr &&
							s !== or &&
							s !== ir
						));
						c++
					);
					a = c - 1
					const g = Eo(t.slice(u, c))
					e ? e.nodes.push(g) : r.push(g)
					break
				}
				case _o:
				case Oo: {
					const u = a
					for (let c = a + 1; c < t.length; c++)
						if (((s = t.charCodeAt(c)), s === Yt)) c += 1
						else if (s === d) {
							a = c
							break
						}
					i += t.slice(u, a + 1)
					break
				}
				case Po: {
					const u = Vo(i, [])
					;(i = ""), e ? e.nodes.push(u) : r.push(u), o.push(u), (e = u)
					break
				}
				case Ro: {
					const u = o.pop()
					if (i.length > 0) {
						const c = yt(i)
						u.nodes.push(c), (i = "")
					}
					o.length > 0 ? (e = o[o.length - 1]) : (e = null)
					break
				}
				default:
					i += String.fromCharCode(d)
			}
		}
		return i.length > 0 && r.push(yt(i)), r
	}
	function Ge(t) {
		const r = []
		return (
			te(H(t), (o) => {
				if (!(o.kind !== "function" || o.value !== "var"))
					return (
						te(o.nodes, (e) => {
							e.kind !== "word" ||
								e.value[0] !== "-" ||
								e.value[1] !== "-" ||
								r.push(e.value)
						}),
						1
					)
			}),
			r
		)
	}
	var zo = 64
	function I(t, r = []) {
		return { kind: "rule", selector: t, nodes: r }
	}
	function D(t, r = "", o = []) {
		return { kind: "at-rule", name: t, params: r, nodes: o }
	}
	function M(t, r = []) {
		return t.charCodeAt(0) === zo ? Oe(t, r) : I(t, r)
	}
	function l(t, r, o = !1) {
		return { kind: "declaration", property: t, value: r, important: o }
	}
	function qe(t) {
		return { kind: "comment", value: t }
	}
	function ne(t, r) {
		return { kind: "context", context: t, nodes: r }
	}
	function U(t) {
		return { kind: "at-root", nodes: t }
	}
	function j(t, r, o = [], e = {}) {
		for (let i = 0; i < t.length; i++) {
			const s = t[i],
				a = o[o.length - 1] ?? null
			if (s.kind === "context") {
				if (j(s.nodes, r, o, { ...e, ...s.context }) === 2) return 2
				continue
			}
			o.push(s)
			let d = !1,
				u = 0,
				c =
					r(s, {
						parent: a,
						context: e,
						path: o,
						replaceWith(g) {
							d ||
								((d = !0),
								Array.isArray(g)
									? g.length === 0
										? (t.splice(i, 1), (u = 0))
										: g.length === 1
											? ((t[i] = g[0]), (u = 1))
											: (t.splice(i, 1, ...g), (u = g.length))
									: ((t[i] = g), (u = 1)))
						},
					}) ?? 0
			if ((o.pop(), d)) {
				c === 0 ? i-- : (i += u - 1)
				continue
			}
			if (c === 2) return 2
			if (c !== 1 && "nodes" in s) {
				o.push(s)
				const g = j(s.nodes, r, o, e)
				if ((o.pop(), g === 2)) return 2
			}
		}
	}
	function Ye(t, r, o = [], e = {}) {
		for (let i = 0; i < t.length; i++) {
			const s = t[i],
				a = o[o.length - 1] ?? null
			if (s.kind === "rule" || s.kind === "at-rule")
				o.push(s), Ye(s.nodes, r, o, e), o.pop()
			else if (s.kind === "context") {
				Ye(s.nodes, r, o, { ...e, ...s.context })
				continue
			}
			o.push(s),
				r(s, {
					parent: a,
					context: e,
					path: o,
					replaceWith(d) {
						Array.isArray(d)
							? d.length === 0
								? t.splice(i, 1)
								: d.length === 1
									? (t[i] = d[0])
									: t.splice(i, 1, ...d)
							: (t[i] = d),
							(i += d.length - 1)
					},
				}),
				o.pop()
		}
	}
	function ke(t, r, o = 3) {
		const e = [],
			i = new Set(),
			s = new q(() => new Set()),
			a = new Set(),
			d = new Set(),
			u = [],
			c = [],
			g = new q(() => new Set())
		function m(k, v, A = {}, y = 0) {
			if (k.kind === "declaration") {
				if (
					k.property === "--tw-sort" ||
					k.value === void 0 ||
					k.value === null
				)
					return
				if (A.theme && k.property[0] === "-" && k.property[1] === "-") {
					if (k.value === "initial") {
						k.value = void 0
						return
					}
					A.keyframes || s.get(v).add(k)
				}
				if (k.value.includes("var("))
					if (A.theme && k.property[0] === "-" && k.property[1] === "-")
						for (const b of Ge(k.value)) g.get(b).add(k.property)
					else r.trackUsedVariables(k.value)
				if (k.property === "animation") for (const b of nr(k.value)) d.add(b)
				if (o & 2 && k.value.includes("color-mix(")) {
					let b = H(k.value),
						T = !1
					if (
						(te(b, (E, { replaceWith: P }) => {
							if (E.kind !== "function" || E.value !== "color-mix") return
							let _ = !1,
								L = !1
							if (
								(te(E.nodes, (R, { replaceWith: G }) => {
									if (
										R.kind == "word" &&
										R.value.toLowerCase() === "currentcolor"
									) {
										;(L = !0), (T = !0)
										return
									}
									if (R.kind !== "function" || R.value !== "var") return
									const F = R.nodes[0]
									if (!F || F.kind !== "word") return
									T = !0
									const W = r.theme.resolveValue(null, [F.value])
									if (!W) {
										_ = !0
										return
									}
									G({ kind: "word", value: W })
								}),
								_ || L)
							) {
								const R = E.nodes.findIndex(
									(F) => F.kind === "separator" && F.value.trim().includes(","),
								)
								if (R === -1) return
								const G = E.nodes.length > R ? E.nodes[R + 1] : null
								if (!G) return
								P(G)
							} else if (T) {
								const R = E.nodes[2]
								R.kind === "word" &&
									(R.value === "oklab" ||
										R.value === "oklch" ||
										R.value === "lab" ||
										R.value === "lch") &&
									(R.value = "srgb")
							}
						}),
						T)
					) {
						const E = { ...k, value: J(b) },
							P = M("@supports (color: color-mix(in lab, red, red))", [k])
						v.push(E, P)
						return
					}
				}
				v.push(k)
			} else if (k.kind === "rule")
				if (k.selector === "&")
					for (const b of k.nodes) {
						const T = []
						m(b, T, A, y + 1), T.length > 0 && v.push(...T)
					}
				else {
					const b = { ...k, nodes: [] }
					for (const T of k.nodes) m(T, b.nodes, A, y + 1)
					b.nodes.length > 0 && v.push(b)
				}
			else if (k.kind === "at-rule" && k.name === "@property" && y === 0) {
				if (i.has(k.params)) return
				if (o & 1) {
					let T = k.params,
						E = null,
						P = !1
					for (const _ of k.nodes)
						_.kind === "declaration" &&
							(_.property === "initial-value"
								? (E = _.value)
								: _.property === "inherits" && (P = _.value === "true"))
					P ? u.push(l(T, E ?? "initial")) : c.push(l(T, E ?? "initial"))
				}
				i.add(k.params)
				const b = { ...k, nodes: [] }
				for (const T of k.nodes) m(T, b.nodes, A, y + 1)
				v.push(b)
			} else if (k.kind === "at-rule") {
				k.name === "@keyframes" && (A = { ...A, keyframes: !0 })
				const b = { ...k, nodes: [] }
				for (const T of k.nodes) m(T, b.nodes, A, y + 1)
				k.name === "@keyframes" && A.theme && a.add(b),
					(b.nodes.length > 0 ||
						b.name === "@layer" ||
						b.name === "@charset" ||
						b.name === "@custom-media" ||
						b.name === "@namespace" ||
						b.name === "@import") &&
						v.push(b)
			} else if (k.kind === "at-root")
				for (const b of k.nodes) {
					const T = []
					m(b, T, A, 0)
					for (const E of T) e.push(E)
				}
			else if (k.kind === "context") {
				if (k.context.reference) return
				for (const b of k.nodes) m(b, v, { ...A, ...k.context }, y)
			} else k.kind === "comment" && v.push(k)
		}
		let h = []
		for (const k of t) m(k, h, {}, 0)
		e: for (const [k, v] of s)
			for (const A of v) {
				if (lr(A.property, r.theme, g)) {
					if (A.property.startsWith(r.theme.prefixKey("--animate-")))
						for (const T of nr(A.value)) d.add(T)
					continue
				}
				const b = k.indexOf(A)
				if ((k.splice(b, 1), k.length === 0)) {
					const T = Uo(h, (E) => E.kind === "rule" && E.nodes === k)
					if (!T || T.length === 0) continue e
					T.unshift({ kind: "at-root", nodes: h })
					do {
						const E = T.pop()
						if (!E) break
						const P = T[T.length - 1]
						if (!P || (P.kind !== "at-root" && P.kind !== "at-rule")) break
						const _ = P.nodes.indexOf(E)
						if (_ === -1) break
						P.nodes.splice(_, 1)
					} while (!0)
					continue e
				}
			}
		for (const k of a)
			if (!d.has(k.params)) {
				const v = e.indexOf(k)
				e.splice(v, 1)
			}
		if (((h = h.concat(e)), o & 1)) {
			const k = []
			if (
				(u.length > 0 && k.push(M(":root, :host", u)),
				c.length > 0 && k.push(M("*, ::before, ::after, ::backdrop", c)),
				k.length > 0)
			) {
				const v = h.findIndex(
					(A) =>
						!(
							A.kind === "comment" ||
							(A.kind === "at-rule" &&
								(A.name === "@charset" || A.name === "@import"))
						),
				)
				h.splice(v < 0 ? h.length : v, 0, D("@layer", "properties", [])),
					h.push(
						M("@layer properties", [
							D(
								"@supports",
								"((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))",
								k,
							),
						]),
					)
			}
		}
		return h
	}
	function re(t) {
		function r(e, i = 0) {
			let s = "",
				a = "  ".repeat(i)
			if (e.kind === "declaration")
				s += `${a}${e.property}: ${e.value}${e.important ? " !important" : ""};
`
			else if (e.kind === "rule") {
				s += `${a}${e.selector} {
`
				for (const d of e.nodes) s += r(d, i + 1)
				s += `${a}}
`
			} else if (e.kind === "at-rule") {
				if (e.nodes.length === 0)
					return `${a}${e.name} ${e.params};
`
				s += `${a}${e.name}${e.params ? ` ${e.params} ` : " "}{
`
				for (const d of e.nodes) s += r(d, i + 1)
				s += `${a}}
`
			} else if (e.kind === "comment")
				s += `${a}/*${e.value}*/
`
			else if (e.kind === "context" || e.kind === "at-root") return ""
			return s
		}
		let o = ""
		for (const e of t) {
			const i = r(e)
			i !== "" && (o += i)
		}
		return o
	}
	function Uo(t, r) {
		let o = []
		return (
			j(t, (e, { path: i }) => {
				if (r(e)) return (o = [...i]), 2
			}),
			o
		)
	}
	function lr(t, r, o, e = new Set()) {
		if (e.has(t) || (e.add(t), r.getOptions(t) & 24)) return !0
		{
			const s = o.get(t) ?? []
			for (const a of s) if (lr(a, r, o, e)) return !0
		}
		return !1
	}
	function nr(t) {
		return t.split(/[\s,]+/)
	}
	var xt = [
			"calc",
			"min",
			"max",
			"clamp",
			"mod",
			"rem",
			"sin",
			"cos",
			"tan",
			"asin",
			"acos",
			"atan",
			"atan2",
			"pow",
			"sqrt",
			"hypot",
			"log",
			"exp",
			"round",
		],
		Qe = ["anchor-size"],
		ar = new RegExp(`(${Qe.join("|")})\\(`, "g")
	function Pe(t) {
		return t.indexOf("(") !== -1 && xt.some((r) => t.includes(`${r}(`))
	}
	function sr(t) {
		if (!xt.some((i) => t.includes(i))) return t
		let r = !1
		Qe.some((i) => t.includes(i)) &&
			((ar.lastIndex = 0),
			(t = t.replace(ar, (i, s) => ((r = !0), `$${Qe.indexOf(s)}$(`))))
		let o = "",
			e = []
		for (let i = 0; i < t.length; i++) {
			const s = t[i]
			if (s === "(") {
				o += s
				let a = i
				for (let u = i - 1; u >= 0; u--) {
					const c = t.charCodeAt(u)
					if (c >= 48 && c <= 57) a = u
					else if (c >= 97 && c <= 122) a = u
					else break
				}
				const d = t.slice(a, i)
				if (xt.includes(d)) {
					e.unshift(!0)
					continue
				} else if (e[0] && d === "") {
					e.unshift(!0)
					continue
				}
				e.unshift(!1)
				continue
			} else if (s === ")") (o += s), e.shift()
			else if (s === "," && e[0]) {
				o += ", "
				continue
			} else {
				if (s === " " && e[0] && o[o.length - 1] === " ") continue
				if ((s === "+" || s === "*" || s === "/" || s === "-") && e[0]) {
					const a = o.trimEnd(),
						d = a[a.length - 1]
					if (d === "+" || d === "*" || d === "/" || d === "-") {
						o += s
						continue
					} else if (d === "(" || d === ",") {
						o += s
						continue
					} else t[i - 1] === " " ? (o += `${s} `) : (o += ` ${s} `)
				} else if (e[0] && t.startsWith("to-zero", i)) {
					const a = i
					;(i += 7), (o += t.slice(a, i + 1))
				} else o += s
			}
		}
		return r ? o.replace(/\$(\d+)\$/g, (i, s) => Qe[s] ?? i) : o
	}
	function fe(t) {
		if (t.indexOf("(") === -1) return Ne(t)
		const r = H(t)
		return At(r), (t = J(r)), (t = sr(t)), t
	}
	function Ne(t, r = !1) {
		let o = ""
		for (let e = 0; e < t.length; e++) {
			const i = t[e]
			i === "\\" && t[e + 1] === "_"
				? ((o += "_"), (e += 1))
				: i === "_" && !r
					? (o += " ")
					: (o += i)
		}
		return o
	}
	function At(t) {
		for (const r of t)
			switch (r.kind) {
				case "function": {
					if (r.value === "url" || r.value.endsWith("_url")) {
						r.value = Ne(r.value)
						break
					}
					if (
						r.value === "var" ||
						r.value.endsWith("_var") ||
						r.value === "theme" ||
						r.value.endsWith("_theme")
					) {
						r.value = Ne(r.value)
						for (let o = 0; o < r.nodes.length; o++) {
							if (o == 0 && r.nodes[o].kind === "word") {
								r.nodes[o].value = Ne(r.nodes[o].value, !0)
								continue
							}
							At([r.nodes[o]])
						}
						break
					}
					;(r.value = Ne(r.value)), At(r.nodes)
					break
				}
				case "separator":
				case "word": {
					r.value = Ne(r.value)
					break
				}
				default:
					jo(r)
			}
	}
	function jo(t) {
		throw new Error(`Unexpected value: ${t}`)
	}
	var Ct = new Uint8Array(256)
	function de(t) {
		let r = 0,
			o = t.length
		for (let e = 0; e < o; e++) {
			const i = t.charCodeAt(e)
			switch (i) {
				case 92:
					e += 1
					break
				case 39:
				case 34:
					while (++e < o) {
						const s = t.charCodeAt(e)
						if (s === 92) {
							e += 1
							continue
						}
						if (s === i) break
					}
					break
				case 40:
					;(Ct[r] = 41), r++
					break
				case 91:
					;(Ct[r] = 93), r++
					break
				case 123:
					break
				case 93:
				case 125:
				case 41:
					if (r === 0) return !1
					r > 0 && i === Ct[r - 1] && r--
					break
				case 59:
					if (r === 0) return !1
					break
			}
		}
		return !0
	}
	var Ze = new Uint8Array(256)
	function K(t, r) {
		let o = 0,
			e = [],
			i = 0,
			s = t.length,
			a = r.charCodeAt(0)
		for (let d = 0; d < s; d++) {
			const u = t.charCodeAt(d)
			if (o === 0 && u === a) {
				e.push(t.slice(i, d)), (i = d + 1)
				continue
			}
			switch (u) {
				case 92:
					d += 1
					break
				case 39:
				case 34:
					while (++d < s) {
						const c = t.charCodeAt(d)
						if (c === 92) {
							d += 1
							continue
						}
						if (c === u) break
					}
					break
				case 40:
					;(Ze[o] = 41), o++
					break
				case 91:
					;(Ze[o] = 93), o++
					break
				case 123:
					;(Ze[o] = 125), o++
					break
				case 93:
				case 125:
				case 41:
					o > 0 && u === Ze[o - 1] && o--
					break
			}
		}
		return e.push(t.slice(i)), e
	}
	var Io = 58,
		ur = 45,
		cr = 97,
		fr = 122
	function* dr(t, r) {
		const o = K(t, ":")
		if (r.theme.prefix) {
			if (o.length === 1 || o[0] !== r.theme.prefix) return null
			o.shift()
		}
		let e = o.pop(),
			i = []
		for (let m = o.length - 1; m >= 0; --m) {
			const h = r.parseVariant(o[m])
			if (h === null) return
			i.push(h)
		}
		let s = !1
		e[e.length - 1] === "!"
			? ((s = !0), (e = e.slice(0, -1)))
			: e[0] === "!" && ((s = !0), (e = e.slice(1))),
			r.utilities.has(e, "static") &&
				!e.includes("[") &&
				(yield { kind: "static", root: e, variants: i, important: s, raw: t })
		let [a, d = null, u] = K(e, "/")
		if (u) return
		const c = d === null ? null : Nt(d)
		if (d !== null && c === null) return
		if (a[0] === "[") {
			if (a[a.length - 1] !== "]") return
			const m = a.charCodeAt(1)
			if (m !== ur && !(m >= cr && m <= fr)) return
			a = a.slice(1, -1)
			const h = a.indexOf(":")
			if (h === -1 || h === 0 || h === a.length - 1) return
			const k = a.slice(0, h),
				v = fe(a.slice(h + 1))
			if (!de(v)) return
			yield {
				kind: "arbitrary",
				property: k,
				value: v,
				modifier: c,
				variants: i,
				important: s,
				raw: t,
			}
			return
		}
		let g
		if (a[a.length - 1] === "]") {
			const m = a.indexOf("-[")
			if (m === -1) return
			const h = a.slice(0, m)
			if (!r.utilities.has(h, "functional")) return
			const k = a.slice(m + 1)
			g = [[h, k]]
		} else if (a[a.length - 1] === ")") {
			const m = a.indexOf("-(")
			if (m === -1) return
			const h = a.slice(0, m)
			if (!r.utilities.has(h, "functional")) return
			let k = a.slice(m + 2, -1),
				v = K(k, ":"),
				A = null
			if (
				(v.length === 2 && ((A = v[0]), (k = v[1])),
				k[0] !== "-" && k[1] !== "-")
			)
				return
			g = [[h, A === null ? `[var(${k})]` : `[${A}:var(${k})]`]]
		} else g = mr(a, (m) => r.utilities.has(m, "functional"))
		for (const [m, h] of g) {
			const k = {
				kind: "functional",
				root: m,
				modifier: c,
				value: null,
				variants: i,
				important: s,
				raw: t,
			}
			if (h === null) {
				yield k
				continue
			}
			{
				const v = h.indexOf("[")
				if (v !== -1) {
					if (h[h.length - 1] !== "]") return
					let y = fe(h.slice(v + 1, -1))
					if (!de(y)) continue
					let b = ""
					for (let T = 0; T < y.length; T++) {
						const E = y.charCodeAt(T)
						if (E === Io) {
							;(b = y.slice(0, T)), (y = y.slice(T + 1))
							break
						}
						if (!(E === ur || (E >= cr && E <= fr))) break
					}
					if (y.length === 0 || y.trim().length === 0) continue
					k.value = { kind: "arbitrary", dataType: b || null, value: y }
				} else {
					const y =
						d === null || k.modifier?.kind === "arbitrary" ? null : `${h}/${d}`
					k.value = { kind: "named", value: h, fraction: y }
				}
			}
			yield k
		}
	}
	function Nt(t) {
		if (t[0] === "[" && t[t.length - 1] === "]") {
			const r = fe(t.slice(1, -1))
			return !de(r) || r.length === 0 || r.trim().length === 0
				? null
				: { kind: "arbitrary", value: r }
		}
		if (t[0] === "(" && t[t.length - 1] === ")") {
			const r = fe(t.slice(1, -1))
			return !de(r) ||
				r.length === 0 ||
				r.trim().length === 0 ||
				(r[0] !== "-" && r[1] !== "-")
				? null
				: { kind: "arbitrary", value: `var(${r})` }
		}
		return { kind: "named", value: t }
	}
	function pr(t, r) {
		if (t[0] === "[" && t[t.length - 1] === "]") {
			if (t[1] === "@" && t.includes("&")) return null
			let o = fe(t.slice(1, -1))
			if (!de(o) || o.length === 0 || o.trim().length === 0) return null
			const e = o[0] === ">" || o[0] === "+" || o[0] === "~"
			return (
				!e && o[0] !== "@" && !o.includes("&") && (o = `&:is(${o})`),
				{ kind: "arbitrary", selector: o, relative: e }
			)
		}
		{
			const [o, e = null, i] = K(t, "/")
			if (i) return null
			const s = mr(o, (a) => r.variants.has(a))
			for (const [a, d] of s)
				switch (r.variants.kind(a)) {
					case "static":
						return d !== null || e !== null ? null : { kind: "static", root: a }
					case "functional": {
						const u = e === null ? null : Nt(e)
						if (e !== null && u === null) return null
						if (d === null)
							return { kind: "functional", root: a, modifier: u, value: null }
						if (d[d.length - 1] === "]") {
							if (d[0] !== "[") continue
							const c = fe(d.slice(1, -1))
							return !de(c) || c.length === 0 || c.trim().length === 0
								? null
								: {
										kind: "functional",
										root: a,
										modifier: u,
										value: { kind: "arbitrary", value: c },
									}
						}
						if (d[d.length - 1] === ")") {
							if (d[0] !== "(") continue
							const c = fe(d.slice(1, -1))
							return !de(c) ||
								c.length === 0 ||
								c.trim().length === 0 ||
								(c[0] !== "-" && c[1] !== "-")
								? null
								: {
										kind: "functional",
										root: a,
										modifier: u,
										value: { kind: "arbitrary", value: `var(${c})` },
									}
						}
						return {
							kind: "functional",
							root: a,
							modifier: u,
							value: { kind: "named", value: d },
						}
					}
					case "compound": {
						if (d === null) return null
						const u = r.parseVariant(d)
						if (u === null || !r.variants.compoundsWith(a, u)) return null
						const c = e === null ? null : Nt(e)
						return e !== null && c === null
							? null
							: { kind: "compound", root: a, modifier: c, variant: u }
					}
				}
		}
		return null
	}
	function* mr(t, r) {
		r(t) && (yield [t, null])
		let o = t.lastIndexOf("-")
		if (o === -1) {
			t[0] === "@" && r("@") && (yield ["@", t.slice(1)])
			return
		}
		do {
			const e = t.slice(0, o)
			if (r(e)) {
				const i = [e, t.slice(o + 1)]
				if (i[1] === "") break
				yield i
			}
			o = t.lastIndexOf("-", o - 1)
		} while (o > 0)
	}
	function ve(t, r, o) {
		if (t === r) return 0
		const e = t.indexOf("("),
			i = r.indexOf("("),
			s = e === -1 ? t.replace(/[\d.]+/g, "") : t.slice(0, e),
			a = i === -1 ? r.replace(/[\d.]+/g, "") : r.slice(0, i),
			d =
				(s === a ? 0 : s < a ? -1 : 1) ||
				(o === "asc"
					? Number.parseInt(t) - Number.parseInt(r)
					: Number.parseInt(r) - Number.parseInt(t))
		return Number.isNaN(d) ? (t < r ? -1 : 1) : d
	}
	var Fo = new Set([
			"black",
			"silver",
			"gray",
			"white",
			"maroon",
			"red",
			"purple",
			"fuchsia",
			"green",
			"lime",
			"olive",
			"yellow",
			"navy",
			"blue",
			"teal",
			"aqua",
			"aliceblue",
			"antiquewhite",
			"aqua",
			"aquamarine",
			"azure",
			"beige",
			"bisque",
			"black",
			"blanchedalmond",
			"blue",
			"blueviolet",
			"brown",
			"burlywood",
			"cadetblue",
			"chartreuse",
			"chocolate",
			"coral",
			"cornflowerblue",
			"cornsilk",
			"crimson",
			"cyan",
			"darkblue",
			"darkcyan",
			"darkgoldenrod",
			"darkgray",
			"darkgreen",
			"darkgrey",
			"darkkhaki",
			"darkmagenta",
			"darkolivegreen",
			"darkorange",
			"darkorchid",
			"darkred",
			"darksalmon",
			"darkseagreen",
			"darkslateblue",
			"darkslategray",
			"darkslategrey",
			"darkturquoise",
			"darkviolet",
			"deeppink",
			"deepskyblue",
			"dimgray",
			"dimgrey",
			"dodgerblue",
			"firebrick",
			"floralwhite",
			"forestgreen",
			"fuchsia",
			"gainsboro",
			"ghostwhite",
			"gold",
			"goldenrod",
			"gray",
			"green",
			"greenyellow",
			"grey",
			"honeydew",
			"hotpink",
			"indianred",
			"indigo",
			"ivory",
			"khaki",
			"lavender",
			"lavenderblush",
			"lawngreen",
			"lemonchiffon",
			"lightblue",
			"lightcoral",
			"lightcyan",
			"lightgoldenrodyellow",
			"lightgray",
			"lightgreen",
			"lightgrey",
			"lightpink",
			"lightsalmon",
			"lightseagreen",
			"lightskyblue",
			"lightslategray",
			"lightslategrey",
			"lightsteelblue",
			"lightyellow",
			"lime",
			"limegreen",
			"linen",
			"magenta",
			"maroon",
			"mediumaquamarine",
			"mediumblue",
			"mediumorchid",
			"mediumpurple",
			"mediumseagreen",
			"mediumslateblue",
			"mediumspringgreen",
			"mediumturquoise",
			"mediumvioletred",
			"midnightblue",
			"mintcream",
			"mistyrose",
			"moccasin",
			"navajowhite",
			"navy",
			"oldlace",
			"olive",
			"olivedrab",
			"orange",
			"orangered",
			"orchid",
			"palegoldenrod",
			"palegreen",
			"paleturquoise",
			"palevioletred",
			"papayawhip",
			"peachpuff",
			"peru",
			"pink",
			"plum",
			"powderblue",
			"purple",
			"rebeccapurple",
			"red",
			"rosybrown",
			"royalblue",
			"saddlebrown",
			"salmon",
			"sandybrown",
			"seagreen",
			"seashell",
			"sienna",
			"silver",
			"skyblue",
			"slateblue",
			"slategray",
			"slategrey",
			"snow",
			"springgreen",
			"steelblue",
			"tan",
			"teal",
			"thistle",
			"tomato",
			"turquoise",
			"violet",
			"wheat",
			"white",
			"whitesmoke",
			"yellow",
			"yellowgreen",
			"transparent",
			"currentcolor",
			"canvas",
			"canvastext",
			"linktext",
			"visitedtext",
			"activetext",
			"buttonface",
			"buttontext",
			"buttonborder",
			"field",
			"fieldtext",
			"highlight",
			"highlighttext",
			"selecteditem",
			"selecteditemtext",
			"mark",
			"marktext",
			"graytext",
			"accentcolor",
			"accentcolortext",
		]),
		Lo = /^(rgba?|hsla?|hwb|color|(ok)?(lab|lch)|light-dark|color-mix)\(/i
	function gr(t) {
		return t.charCodeAt(0) === 35 || Lo.test(t) || Fo.has(t.toLowerCase())
	}
	var Mo = {
		color: gr,
		length: Xe,
		percentage: $t,
		ratio: ri,
		number: kr,
		integer: V,
		url: hr,
		position: ni,
		"bg-size": li,
		"line-width": Wo,
		image: Go,
		"family-name": Jo,
		"generic-name": Yo,
		"absolute-size": Qo,
		"relative-size": Zo,
		angle: ui,
		vector: fi,
	}
	function B(t, r) {
		if (t.startsWith("var(")) return null
		for (const o of r) if (Mo[o]?.(t)) return o
		return null
	}
	var Bo = /^url\(.*\)$/
	function hr(t) {
		return Bo.test(t)
	}
	function Wo(t) {
		return K(t, " ").every(
			(r) => Xe(r) || kr(r) || r === "thin" || r === "medium" || r === "thick",
		)
	}
	var qo = /^(?:element|image|cross-fade|image-set)\(/,
		Ho = /^(repeating-)?(conic|linear|radial)-gradient\(/
	function Go(t) {
		let r = 0
		for (const o of K(t, ","))
			if (!o.startsWith("var(")) {
				if (hr(o)) {
					r += 1
					continue
				}
				if (Ho.test(o)) {
					r += 1
					continue
				}
				if (qo.test(o)) {
					r += 1
					continue
				}
				return !1
			}
		return r > 0
	}
	function Yo(t) {
		return (
			t === "serif" ||
			t === "sans-serif" ||
			t === "monospace" ||
			t === "cursive" ||
			t === "fantasy" ||
			t === "system-ui" ||
			t === "ui-serif" ||
			t === "ui-sans-serif" ||
			t === "ui-monospace" ||
			t === "ui-rounded" ||
			t === "math" ||
			t === "emoji" ||
			t === "fangsong"
		)
	}
	function Jo(t) {
		let r = 0
		for (const o of K(t, ",")) {
			const e = o.charCodeAt(0)
			if (e >= 48 && e <= 57) return !1
			o.startsWith("var(") || (r += 1)
		}
		return r > 0
	}
	function Qo(t) {
		return (
			t === "xx-small" ||
			t === "x-small" ||
			t === "small" ||
			t === "medium" ||
			t === "large" ||
			t === "x-large" ||
			t === "xx-large" ||
			t === "xxx-large"
		)
	}
	function Zo(t) {
		return t === "larger" || t === "smaller"
	}
	var ae = /[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/,
		Xo = new RegExp(`^${ae.source}$`)
	function kr(t) {
		return Xo.test(t) || Pe(t)
	}
	var ei = new RegExp(`^${ae.source}%$`)
	function $t(t) {
		return ei.test(t) || Pe(t)
	}
	var ti = new RegExp(`^${ae.source}s*/s*${ae.source}$`)
	function ri(t) {
		return ti.test(t) || Pe(t)
	}
	var oi = [
			"cm",
			"mm",
			"Q",
			"in",
			"pc",
			"pt",
			"px",
			"em",
			"ex",
			"ch",
			"rem",
			"lh",
			"rlh",
			"vw",
			"vh",
			"vmin",
			"vmax",
			"vb",
			"vi",
			"svw",
			"svh",
			"lvw",
			"lvh",
			"dvw",
			"dvh",
			"cqw",
			"cqh",
			"cqi",
			"cqb",
			"cqmin",
			"cqmax",
		],
		ii = new RegExp(`^${ae.source}(${oi.join("|")})$`)
	function Xe(t) {
		return ii.test(t) || Pe(t)
	}
	function ni(t) {
		let r = 0
		for (const o of K(t, " ")) {
			if (
				o === "center" ||
				o === "top" ||
				o === "right" ||
				o === "bottom" ||
				o === "left"
			) {
				r += 1
				continue
			}
			if (!o.startsWith("var(")) {
				if (Xe(o) || $t(o)) {
					r += 1
					continue
				}
				return !1
			}
		}
		return r > 0
	}
	function li(t) {
		let r = 0
		for (const o of K(t, ",")) {
			if (o === "cover" || o === "contain") {
				r += 1
				continue
			}
			const e = K(o, " ")
			if (e.length !== 1 && e.length !== 2) return !1
			if (e.every((i) => i === "auto" || Xe(i) || $t(i))) {
				r += 1
				continue
			}
		}
		return r > 0
	}
	var ai = ["deg", "rad", "grad", "turn"],
		si = new RegExp(`^${ae.source}(${ai.join("|")})$`)
	function ui(t) {
		return si.test(t)
	}
	var ci = new RegExp(`^${ae.source} +${ae.source} +${ae.source}$`)
	function fi(t) {
		return ci.test(t)
	}
	function V(t) {
		const r = Number(t)
		return Number.isInteger(r) && r >= 0 && String(r) === String(t)
	}
	function St(t) {
		const r = Number(t)
		return Number.isInteger(r) && r > 0 && String(r) === String(t)
	}
	function we(t) {
		return vr(t, 0.25)
	}
	function et(t) {
		return vr(t, 0.25)
	}
	function vr(t, r) {
		const o = Number(t)
		return o >= 0 && o % r === 0 && String(o) === String(t)
	}
	var di = new Set(["inset", "inherit", "initial", "revert", "unset"]),
		wr = /^-?(\d+|\.\d+)(.*?)$/g
	function _e(t, r) {
		return K(t, ",")
			.map((e) => {
				e = e.trim()
				let i = K(e, " ").filter((c) => c.trim() !== ""),
					s = null,
					a = null,
					d = null
				for (const c of i)
					di.has(c) ||
						(wr.test(c)
							? (a === null ? (a = c) : d === null && (d = c),
								(wr.lastIndex = 0))
							: s === null && (s = c))
				if (a === null || d === null) return e
				const u = r(s ?? "currentcolor")
				return s !== null ? e.replace(s, u) : `${e} ${u}`
			})
			.join(", ")
	}
	var pi = /^-?[a-z][a-zA-Z0-9/%._-]*$/,
		mi = /^-?[a-z][a-zA-Z0-9/%._-]*-\*$/,
		rt = [
			"0",
			"0.5",
			"1",
			"1.5",
			"2",
			"2.5",
			"3",
			"3.5",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"14",
			"16",
			"20",
			"24",
			"28",
			"32",
			"36",
			"40",
			"44",
			"48",
			"52",
			"56",
			"60",
			"64",
			"72",
			"80",
			"96",
		],
		Tt = class {
			utilities = new q(() => [])
			completions = new Map()
			static(r, o) {
				this.utilities.get(r).push({ kind: "static", compileFn: o })
			}
			functional(r, o, e) {
				this.utilities
					.get(r)
					.push({ kind: "functional", compileFn: o, options: e })
			}
			has(r, o) {
				return (
					this.utilities.has(r) &&
					this.utilities.get(r).some((e) => e.kind === o)
				)
			}
			get(r) {
				return this.utilities.has(r) ? this.utilities.get(r) : []
			}
			getCompletions(r) {
				return this.completions.get(r)?.() ?? []
			}
			suggest(r, o) {
				this.completions.set(r, o)
			}
			keys(r) {
				const o = []
				for (const [e, i] of this.utilities.entries())
					for (const s of i)
						if (s.kind === r) {
							o.push(e)
							break
						}
				return o
			}
		}
	function C(t, r, o) {
		return D("@property", t, [
			l("syntax", o ? `"${o}"` : '"*"'),
			l("inherits", "false"),
			...(r ? [l("initial-value", r)] : []),
		])
	}
	function Y(t, r) {
		if (r === null) return t
		const o = Number(r)
		return (
			Number.isNaN(o) || (r = `${o * 100}%`),
			`color-mix(in oklab, ${t} ${r}, transparent)`
		)
	}
	function yr(t, r) {
		const o = Number(r)
		return (
			Number.isNaN(o) || (r = `${o * 100}%`), `oklab(from ${t} l a b / ${r})`
		)
	}
	function Q(t, r, o) {
		if (!r) return t
		if (r.kind === "arbitrary") return Y(t, r.value)
		const e = o.resolve(r.value, ["--opacity"])
		return e ? Y(t, e) : et(r.value) ? Y(t, `${r.value}%`) : null
	}
	function Z(t, r, o) {
		let e = null
		switch (t.value.value) {
			case "inherit": {
				e = "inherit"
				break
			}
			case "transparent": {
				e = "transparent"
				break
			}
			case "current": {
				e = "currentcolor"
				break
			}
			default: {
				e = r.resolve(t.value.value, o)
				break
			}
		}
		return e ? Q(e, t.modifier, r) : null
	}
	function xr(t) {
		const r = new Tt()
		function o(n, f) {
			const p = /(\d+)_(\d+)/g
			function* x(N) {
				for (const O of t.keysInNamespaces(N))
					yield O.replace(p, ($, S, z) => `${S}.${z}`)
			}
			const w = [
				"1/2",
				"1/3",
				"2/3",
				"1/4",
				"2/4",
				"3/4",
				"1/5",
				"2/5",
				"3/5",
				"4/5",
				"1/6",
				"2/6",
				"3/6",
				"4/6",
				"5/6",
				"1/12",
				"2/12",
				"3/12",
				"4/12",
				"5/12",
				"6/12",
				"7/12",
				"8/12",
				"9/12",
				"10/12",
				"11/12",
			]
			r.suggest(n, () => {
				const N = []
				for (const O of f()) {
					if (typeof O == "string") {
						N.push({ values: [O], modifiers: [] })
						continue
					}
					const $ = [...(O.values ?? []), ...x(O.valueThemeKeys ?? [])],
						S = [...(O.modifiers ?? []), ...x(O.modifierThemeKeys ?? [])]
					O.supportsFractions && $.push(...w),
						O.hasDefaultValue && $.unshift(null),
						N.push({
							supportsNegative: O.supportsNegative,
							values: $,
							modifiers: S,
						})
				}
				return N
			})
		}
		function e(n, f) {
			r.static(n, () =>
				f.map((p) => (typeof p == "function" ? p() : l(p[0], p[1]))),
			)
		}
		function i(n, f) {
			function p({ negative: x }) {
				return (w) => {
					let N = null,
						O = null
					if (w.value)
						if (w.value.kind === "arbitrary") {
							if (w.modifier) return
							;(N = w.value.value), (O = w.value.dataType)
						} else {
							if (
								((N = t.resolve(
									w.value.fraction ?? w.value.value,
									f.themeKeys ?? [],
								)),
								N === null && f.supportsFractions && w.value.fraction)
							) {
								const [$, S] = K(w.value.fraction, "/")
								if (!V($) || !V(S)) return
								N = `calc(${w.value.fraction} * 100%)`
							}
							if (N === null && x && f.handleNegativeBareValue) {
								if (
									((N = f.handleNegativeBareValue(w.value)),
									!N?.includes("/") && w.modifier)
								)
									return
								if (N !== null) return f.handle(N, null)
							}
							if (
								N === null &&
								f.handleBareValue &&
								((N = f.handleBareValue(w.value)),
								!N?.includes("/") && w.modifier)
							)
								return
						}
					else {
						if (w.modifier) return
						N =
							f.defaultValue !== void 0
								? f.defaultValue
								: t.resolve(null, f.themeKeys ?? [])
					}
					if (N !== null) return f.handle(x ? `calc(${N} * -1)` : N, O)
				}
			}
			f.supportsNegative && r.functional(`-${n}`, p({ negative: !0 })),
				r.functional(n, p({ negative: !1 })),
				o(n, () => [
					{
						supportsNegative: f.supportsNegative,
						valueThemeKeys: f.themeKeys ?? [],
						hasDefaultValue:
							f.defaultValue !== void 0 && f.defaultValue !== null,
						supportsFractions: f.supportsFractions,
					},
				])
		}
		function s(n, f) {
			r.functional(n, (p) => {
				if (!p.value) return
				let x = null
				if (
					(p.value.kind === "arbitrary"
						? ((x = p.value.value), (x = Q(x, p.modifier, t)))
						: (x = Z(p, t, f.themeKeys)),
					x !== null)
				)
					return f.handle(x)
			}),
				o(n, () => [
					{
						values: ["current", "inherit", "transparent"],
						valueThemeKeys: f.themeKeys,
						modifiers: Array.from({ length: 21 }, (p, x) => `${x * 5}`),
					},
				])
		}
		function a(
			n,
			f,
			p,
			{ supportsNegative: x = !1, supportsFractions: w = !1 } = {},
		) {
			x && r.static(`-${n}-px`, () => p("-1px")),
				r.static(`${n}-px`, () => p("1px")),
				i(n, {
					themeKeys: f,
					supportsFractions: w,
					supportsNegative: x,
					defaultValue: null,
					handleBareValue: ({ value: N }) => {
						const O = t.resolve(null, ["--spacing"])
						return !O || !we(N) ? null : `calc(${O} * ${N})`
					},
					handleNegativeBareValue: ({ value: N }) => {
						const O = t.resolve(null, ["--spacing"])
						return !O || !we(N) ? null : `calc(${O} * -${N})`
					},
					handle: p,
				}),
				o(n, () => [
					{
						values: t.get(["--spacing"]) ? rt : [],
						supportsNegative: x,
						supportsFractions: w,
						valueThemeKeys: f,
					},
				])
		}
		e("sr-only", [
			["position", "absolute"],
			["width", "1px"],
			["height", "1px"],
			["padding", "0"],
			["margin", "-1px"],
			["overflow", "hidden"],
			["clip", "rect(0, 0, 0, 0)"],
			["white-space", "nowrap"],
			["border-width", "0"],
		]),
			e("not-sr-only", [
				["position", "static"],
				["width", "auto"],
				["height", "auto"],
				["padding", "0"],
				["margin", "0"],
				["overflow", "visible"],
				["clip", "auto"],
				["white-space", "normal"],
			]),
			e("pointer-events-none", [["pointer-events", "none"]]),
			e("pointer-events-auto", [["pointer-events", "auto"]]),
			e("visible", [["visibility", "visible"]]),
			e("invisible", [["visibility", "hidden"]]),
			e("collapse", [["visibility", "collapse"]]),
			e("static", [["position", "static"]]),
			e("fixed", [["position", "fixed"]]),
			e("absolute", [["position", "absolute"]]),
			e("relative", [["position", "relative"]]),
			e("sticky", [["position", "sticky"]])
		for (const [n, f] of [
			["inset", "inset"],
			["inset-x", "inset-inline"],
			["inset-y", "inset-block"],
			["start", "inset-inline-start"],
			["end", "inset-inline-end"],
			["top", "top"],
			["right", "right"],
			["bottom", "bottom"],
			["left", "left"],
		])
			e(`${n}-auto`, [[f, "auto"]]),
				e(`${n}-full`, [[f, "100%"]]),
				e(`-${n}-full`, [[f, "-100%"]]),
				a(n, ["--inset", "--spacing"], (p) => [l(f, p)], {
					supportsNegative: !0,
					supportsFractions: !0,
				})
		e("isolate", [["isolation", "isolate"]]),
			e("isolation-auto", [["isolation", "auto"]]),
			e("z-auto", [["z-index", "auto"]]),
			i("z", {
				supportsNegative: !0,
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				themeKeys: ["--z-index"],
				handle: (n) => [l("z-index", n)],
			}),
			o("z", () => [
				{
					supportsNegative: !0,
					values: ["0", "10", "20", "30", "40", "50"],
					valueThemeKeys: ["--z-index"],
				},
			]),
			e("order-first", [["order", "-9999"]]),
			e("order-last", [["order", "9999"]]),
			e("order-none", [["order", "0"]]),
			i("order", {
				supportsNegative: !0,
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				themeKeys: ["--order"],
				handle: (n) => [l("order", n)],
			}),
			o("order", () => [
				{
					supportsNegative: !0,
					values: Array.from({ length: 12 }, (n, f) => `${f + 1}`),
					valueThemeKeys: ["--order"],
				},
			]),
			e("col-auto", [["grid-column", "auto"]]),
			i("col", {
				supportsNegative: !0,
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				themeKeys: ["--grid-column"],
				handle: (n) => [l("grid-column", n)],
			}),
			e("col-span-full", [["grid-column", "1 / -1"]]),
			i("col-span", {
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				handle: (n) => [l("grid-column", `span ${n} / span ${n}`)],
			}),
			e("col-start-auto", [["grid-column-start", "auto"]]),
			i("col-start", {
				supportsNegative: !0,
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				themeKeys: ["--grid-column-start"],
				handle: (n) => [l("grid-column-start", n)],
			}),
			e("col-end-auto", [["grid-column-end", "auto"]]),
			i("col-end", {
				supportsNegative: !0,
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				themeKeys: ["--grid-column-end"],
				handle: (n) => [l("grid-column-end", n)],
			}),
			o("col-span", () => [
				{
					values: Array.from({ length: 12 }, (n, f) => `${f + 1}`),
					valueThemeKeys: [],
				},
			]),
			o("col-start", () => [
				{
					supportsNegative: !0,
					values: Array.from({ length: 13 }, (n, f) => `${f + 1}`),
					valueThemeKeys: ["--grid-column-start"],
				},
			]),
			o("col-end", () => [
				{
					supportsNegative: !0,
					values: Array.from({ length: 13 }, (n, f) => `${f + 1}`),
					valueThemeKeys: ["--grid-column-end"],
				},
			]),
			e("row-auto", [["grid-row", "auto"]]),
			i("row", {
				supportsNegative: !0,
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				themeKeys: ["--grid-row"],
				handle: (n) => [l("grid-row", n)],
			}),
			e("row-span-full", [["grid-row", "1 / -1"]]),
			i("row-span", {
				themeKeys: [],
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				handle: (n) => [l("grid-row", `span ${n} / span ${n}`)],
			}),
			e("row-start-auto", [["grid-row-start", "auto"]]),
			i("row-start", {
				supportsNegative: !0,
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				themeKeys: ["--grid-row-start"],
				handle: (n) => [l("grid-row-start", n)],
			}),
			e("row-end-auto", [["grid-row-end", "auto"]]),
			i("row-end", {
				supportsNegative: !0,
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				themeKeys: ["--grid-row-end"],
				handle: (n) => [l("grid-row-end", n)],
			}),
			o("row-span", () => [
				{
					values: Array.from({ length: 12 }, (n, f) => `${f + 1}`),
					valueThemeKeys: [],
				},
			]),
			o("row-start", () => [
				{
					supportsNegative: !0,
					values: Array.from({ length: 13 }, (n, f) => `${f + 1}`),
					valueThemeKeys: ["--grid-row-start"],
				},
			]),
			o("row-end", () => [
				{
					supportsNegative: !0,
					values: Array.from({ length: 13 }, (n, f) => `${f + 1}`),
					valueThemeKeys: ["--grid-row-end"],
				},
			]),
			e("float-start", [["float", "inline-start"]]),
			e("float-end", [["float", "inline-end"]]),
			e("float-right", [["float", "right"]]),
			e("float-left", [["float", "left"]]),
			e("float-none", [["float", "none"]]),
			e("clear-start", [["clear", "inline-start"]]),
			e("clear-end", [["clear", "inline-end"]]),
			e("clear-right", [["clear", "right"]]),
			e("clear-left", [["clear", "left"]]),
			e("clear-both", [["clear", "both"]]),
			e("clear-none", [["clear", "none"]])
		for (const [n, f] of [
			["m", "margin"],
			["mx", "margin-inline"],
			["my", "margin-block"],
			["ms", "margin-inline-start"],
			["me", "margin-inline-end"],
			["mt", "margin-top"],
			["mr", "margin-right"],
			["mb", "margin-bottom"],
			["ml", "margin-left"],
		])
			e(`${n}-auto`, [[f, "auto"]]),
				a(n, ["--margin", "--spacing"], (p) => [l(f, p)], {
					supportsNegative: !0,
				})
		e("box-border", [["box-sizing", "border-box"]]),
			e("box-content", [["box-sizing", "content-box"]]),
			e("line-clamp-none", [
				["overflow", "visible"],
				["display", "block"],
				["-webkit-box-orient", "horizontal"],
				["-webkit-line-clamp", "unset"],
			]),
			i("line-clamp", {
				themeKeys: ["--line-clamp"],
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				handle: (n) => [
					l("overflow", "hidden"),
					l("display", "-webkit-box"),
					l("-webkit-box-orient", "vertical"),
					l("-webkit-line-clamp", n),
				],
			}),
			o("line-clamp", () => [
				{
					values: ["1", "2", "3", "4", "5", "6"],
					valueThemeKeys: ["--line-clamp"],
				},
			]),
			e("block", [["display", "block"]]),
			e("inline-block", [["display", "inline-block"]]),
			e("inline", [["display", "inline"]]),
			e("hidden", [["display", "none"]]),
			e("inline-flex", [["display", "inline-flex"]]),
			e("table", [["display", "table"]]),
			e("inline-table", [["display", "inline-table"]]),
			e("table-caption", [["display", "table-caption"]]),
			e("table-cell", [["display", "table-cell"]]),
			e("table-column", [["display", "table-column"]]),
			e("table-column-group", [["display", "table-column-group"]]),
			e("table-footer-group", [["display", "table-footer-group"]]),
			e("table-header-group", [["display", "table-header-group"]]),
			e("table-row-group", [["display", "table-row-group"]]),
			e("table-row", [["display", "table-row"]]),
			e("flow-root", [["display", "flow-root"]]),
			e("flex", [["display", "flex"]]),
			e("grid", [["display", "grid"]]),
			e("inline-grid", [["display", "inline-grid"]]),
			e("contents", [["display", "contents"]]),
			e("list-item", [["display", "list-item"]]),
			e("field-sizing-content", [["field-sizing", "content"]]),
			e("field-sizing-fixed", [["field-sizing", "fixed"]]),
			e("aspect-auto", [["aspect-ratio", "auto"]]),
			e("aspect-square", [["aspect-ratio", "1 / 1"]]),
			i("aspect", {
				themeKeys: ["--aspect"],
				handleBareValue: ({ fraction: n }) => {
					if (n === null) return null
					const [f, p] = K(n, "/")
					return !V(f) || !V(p) ? null : n
				},
				handle: (n) => [l("aspect-ratio", n)],
			})
		for (const [n, f] of [
			["auto", "auto"],
			["full", "100%"],
			["svw", "100svw"],
			["lvw", "100lvw"],
			["dvw", "100dvw"],
			["svh", "100svh"],
			["lvh", "100lvh"],
			["dvh", "100dvh"],
			["min", "min-content"],
			["max", "max-content"],
			["fit", "fit-content"],
		])
			e(`size-${n}`, [
				["--tw-sort", "size"],
				["width", f],
				["height", f],
			]),
				e(`w-${n}`, [["width", f]]),
				e(`h-${n}`, [["height", f]]),
				e(`min-w-${n}`, [["min-width", f]]),
				e(`min-h-${n}`, [["min-height", f]]),
				n !== "auto" &&
					(e(`max-w-${n}`, [["max-width", f]]),
					e(`max-h-${n}`, [["max-height", f]]))
		e("w-screen", [["width", "100vw"]]),
			e("min-w-screen", [["min-width", "100vw"]]),
			e("max-w-screen", [["max-width", "100vw"]]),
			e("h-screen", [["height", "100vh"]]),
			e("min-h-screen", [["min-height", "100vh"]]),
			e("max-h-screen", [["max-height", "100vh"]]),
			e("max-w-none", [["max-width", "none"]]),
			e("max-h-none", [["max-height", "none"]]),
			a(
				"size",
				["--size", "--spacing"],
				(n) => [l("--tw-sort", "size"), l("width", n), l("height", n)],
				{ supportsFractions: !0 },
			)
		for (const [n, f, p] of [
			["w", ["--width", "--spacing", "--container"], "width"],
			["min-w", ["--min-width", "--spacing", "--container"], "min-width"],
			["max-w", ["--max-width", "--spacing", "--container"], "max-width"],
			["h", ["--height", "--spacing"], "height"],
			["min-h", ["--min-height", "--height", "--spacing"], "min-height"],
			["max-h", ["--max-height", "--height", "--spacing"], "max-height"],
		])
			a(n, f, (x) => [l(p, x)], { supportsFractions: !0 })
		r.static("container", () => {
			const n = [...t.namespace("--breakpoint").values()]
			n.sort((p, x) => ve(p, x, "asc"))
			const f = [l("--tw-sort", "--tw-container-component"), l("width", "100%")]
			for (const p of n)
				f.push(D("@media", `(width >= ${p})`, [l("max-width", p)]))
			return f
		}),
			e("flex-auto", [["flex", "auto"]]),
			e("flex-initial", [["flex", "0 auto"]]),
			e("flex-none", [["flex", "none"]]),
			r.functional("flex", (n) => {
				if (n.value) {
					if (n.value.kind === "arbitrary")
						return n.modifier ? void 0 : [l("flex", n.value.value)]
					if (n.value.fraction) {
						const [f, p] = K(n.value.fraction, "/")
						return !V(f) || !V(p)
							? void 0
							: [l("flex", `calc(${n.value.fraction} * 100%)`)]
					}
					if (V(n.value.value))
						return n.modifier ? void 0 : [l("flex", n.value.value)]
				}
			}),
			o("flex", () => [{ supportsFractions: !0 }]),
			i("shrink", {
				defaultValue: "1",
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				handle: (n) => [l("flex-shrink", n)],
			}),
			i("grow", {
				defaultValue: "1",
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				handle: (n) => [l("flex-grow", n)],
			}),
			o("shrink", () => [
				{ values: ["0"], valueThemeKeys: [], hasDefaultValue: !0 },
			]),
			o("grow", () => [
				{ values: ["0"], valueThemeKeys: [], hasDefaultValue: !0 },
			]),
			e("basis-auto", [["flex-basis", "auto"]]),
			e("basis-full", [["flex-basis", "100%"]]),
			a(
				"basis",
				["--flex-basis", "--spacing", "--container"],
				(n) => [l("flex-basis", n)],
				{ supportsFractions: !0 },
			),
			e("table-auto", [["table-layout", "auto"]]),
			e("table-fixed", [["table-layout", "fixed"]]),
			e("caption-top", [["caption-side", "top"]]),
			e("caption-bottom", [["caption-side", "bottom"]]),
			e("border-collapse", [["border-collapse", "collapse"]]),
			e("border-separate", [["border-collapse", "separate"]])
		const d = () =>
			U([
				C("--tw-border-spacing-x", "0", "<length>"),
				C("--tw-border-spacing-y", "0", "<length>"),
			])
		a("border-spacing", ["--border-spacing", "--spacing"], (n) => [
			d(),
			l("--tw-border-spacing-x", n),
			l("--tw-border-spacing-y", n),
			l(
				"border-spacing",
				"var(--tw-border-spacing-x) var(--tw-border-spacing-y)",
			),
		]),
			a("border-spacing-x", ["--border-spacing", "--spacing"], (n) => [
				d(),
				l("--tw-border-spacing-x", n),
				l(
					"border-spacing",
					"var(--tw-border-spacing-x) var(--tw-border-spacing-y)",
				),
			]),
			a("border-spacing-y", ["--border-spacing", "--spacing"], (n) => [
				d(),
				l("--tw-border-spacing-y", n),
				l(
					"border-spacing",
					"var(--tw-border-spacing-x) var(--tw-border-spacing-y)",
				),
			]),
			e("origin-center", [["transform-origin", "center"]]),
			e("origin-top", [["transform-origin", "top"]]),
			e("origin-top-right", [["transform-origin", "top right"]]),
			e("origin-right", [["transform-origin", "right"]]),
			e("origin-bottom-right", [["transform-origin", "bottom right"]]),
			e("origin-bottom", [["transform-origin", "bottom"]]),
			e("origin-bottom-left", [["transform-origin", "bottom left"]]),
			e("origin-left", [["transform-origin", "left"]]),
			e("origin-top-left", [["transform-origin", "top left"]]),
			i("origin", {
				themeKeys: ["--transform-origin"],
				handle: (n) => [l("transform-origin", n)],
			}),
			e("perspective-origin-center", [["perspective-origin", "center"]]),
			e("perspective-origin-top", [["perspective-origin", "top"]]),
			e("perspective-origin-top-right", [["perspective-origin", "top right"]]),
			e("perspective-origin-right", [["perspective-origin", "right"]]),
			e("perspective-origin-bottom-right", [
				["perspective-origin", "bottom right"],
			]),
			e("perspective-origin-bottom", [["perspective-origin", "bottom"]]),
			e("perspective-origin-bottom-left", [
				["perspective-origin", "bottom left"],
			]),
			e("perspective-origin-left", [["perspective-origin", "left"]]),
			e("perspective-origin-top-left", [["perspective-origin", "top left"]]),
			i("perspective-origin", {
				themeKeys: ["--perspective-origin"],
				handle: (n) => [l("perspective-origin", n)],
			}),
			e("perspective-none", [["perspective", "none"]]),
			i("perspective", {
				themeKeys: ["--perspective"],
				handle: (n) => [l("perspective", n)],
			})
		const u = () =>
			U([
				C("--tw-translate-x", "0"),
				C("--tw-translate-y", "0"),
				C("--tw-translate-z", "0"),
			])
		e("translate-none", [["translate", "none"]]),
			e("-translate-full", [
				u,
				["--tw-translate-x", "-100%"],
				["--tw-translate-y", "-100%"],
				["translate", "var(--tw-translate-x) var(--tw-translate-y)"],
			]),
			e("translate-full", [
				u,
				["--tw-translate-x", "100%"],
				["--tw-translate-y", "100%"],
				["translate", "var(--tw-translate-x) var(--tw-translate-y)"],
			]),
			a(
				"translate",
				["--translate", "--spacing"],
				(n) => [
					u(),
					l("--tw-translate-x", n),
					l("--tw-translate-y", n),
					l("translate", "var(--tw-translate-x) var(--tw-translate-y)"),
				],
				{ supportsNegative: !0, supportsFractions: !0 },
			)
		for (const n of ["x", "y"])
			e(`-translate-${n}-full`, [
				u,
				[`--tw-translate-${n}`, "-100%"],
				["translate", "var(--tw-translate-x) var(--tw-translate-y)"],
			]),
				e(`translate-${n}-full`, [
					u,
					[`--tw-translate-${n}`, "100%"],
					["translate", "var(--tw-translate-x) var(--tw-translate-y)"],
				]),
				a(
					`translate-${n}`,
					["--translate", "--spacing"],
					(f) => [
						u(),
						l(`--tw-translate-${n}`, f),
						l("translate", "var(--tw-translate-x) var(--tw-translate-y)"),
					],
					{ supportsNegative: !0, supportsFractions: !0 },
				)
		a(
			"translate-z",
			["--translate", "--spacing"],
			(n) => [
				u(),
				l("--tw-translate-z", n),
				l(
					"translate",
					"var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)",
				),
			],
			{ supportsNegative: !0 },
		),
			e("translate-3d", [
				u,
				[
					"translate",
					"var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)",
				],
			])
		const c = () =>
			U([
				C("--tw-scale-x", "1"),
				C("--tw-scale-y", "1"),
				C("--tw-scale-z", "1"),
			])
		e("scale-none", [["scale", "none"]])
		function g({ negative: n }) {
			return (f) => {
				if (!f.value || f.modifier) return
				let p
				return f.value.kind === "arbitrary"
					? ((p = f.value.value), [l("scale", p)])
					: ((p = t.resolve(f.value.value, ["--scale"])),
						!p && V(f.value.value) && (p = `${f.value.value}%`),
						p
							? ((p = n ? `calc(${p} * -1)` : p),
								[
									c(),
									l("--tw-scale-x", p),
									l("--tw-scale-y", p),
									l("--tw-scale-z", p),
									l("scale", "var(--tw-scale-x) var(--tw-scale-y)"),
								])
							: void 0)
			}
		}
		r.functional("-scale", g({ negative: !0 })),
			r.functional("scale", g({ negative: !1 })),
			o("scale", () => [
				{
					supportsNegative: !0,
					values: [
						"0",
						"50",
						"75",
						"90",
						"95",
						"100",
						"105",
						"110",
						"125",
						"150",
						"200",
					],
					valueThemeKeys: ["--scale"],
				},
			])
		for (const n of ["x", "y", "z"])
			i(`scale-${n}`, {
				supportsNegative: !0,
				themeKeys: ["--scale"],
				handleBareValue: ({ value: f }) => (V(f) ? `${f}%` : null),
				handle: (f) => [
					c(),
					l(`--tw-scale-${n}`, f),
					l(
						"scale",
						`var(--tw-scale-x) var(--tw-scale-y)${n === "z" ? " var(--tw-scale-z)" : ""}`,
					),
				],
			}),
				o(`scale-${n}`, () => [
					{
						supportsNegative: !0,
						values: [
							"0",
							"50",
							"75",
							"90",
							"95",
							"100",
							"105",
							"110",
							"125",
							"150",
							"200",
						],
						valueThemeKeys: ["--scale"],
					},
				])
		e("scale-3d", [
			c,
			["scale", "var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)"],
		]),
			e("rotate-none", [["rotate", "none"]])
		function m({ negative: n }) {
			return (f) => {
				if (!f.value || f.modifier) return
				let p
				if (f.value.kind === "arbitrary") {
					p = f.value.value
					const x = f.value.dataType ?? B(p, ["angle", "vector"])
					if (x === "vector") return [l("rotate", `${p} var(--tw-rotate)`)]
					if (x !== "angle") return [l("rotate", p)]
				} else if (
					((p = t.resolve(f.value.value, ["--rotate"])),
					!p && V(f.value.value) && (p = `${f.value.value}deg`),
					!p)
				)
					return
				return [l("rotate", n ? `calc(${p} * -1)` : p)]
			}
		}
		r.functional("-rotate", m({ negative: !0 })),
			r.functional("rotate", m({ negative: !1 })),
			o("rotate", () => [
				{
					supportsNegative: !0,
					values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
					valueThemeKeys: ["--rotate"],
				},
			])
		{
			const n = [
					"var(--tw-rotate-x)",
					"var(--tw-rotate-y)",
					"var(--tw-rotate-z)",
					"var(--tw-skew-x)",
					"var(--tw-skew-y)",
				].join(" "),
				f = () =>
					U([
						C("--tw-rotate-x", "rotateX(0)"),
						C("--tw-rotate-y", "rotateY(0)"),
						C("--tw-rotate-z", "rotateZ(0)"),
						C("--tw-skew-x", "skewX(0)"),
						C("--tw-skew-y", "skewY(0)"),
					])
			for (const p of ["x", "y", "z"])
				i(`rotate-${p}`, {
					supportsNegative: !0,
					themeKeys: ["--rotate"],
					handleBareValue: ({ value: x }) => (V(x) ? `${x}deg` : null),
					handle: (x) => [
						f(),
						l(`--tw-rotate-${p}`, `rotate${p.toUpperCase()}(${x})`),
						l("transform", n),
					],
				}),
					o(`rotate-${p}`, () => [
						{
							supportsNegative: !0,
							values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
							valueThemeKeys: ["--rotate"],
						},
					])
			i("skew", {
				supportsNegative: !0,
				themeKeys: ["--skew"],
				handleBareValue: ({ value: p }) => (V(p) ? `${p}deg` : null),
				handle: (p) => [
					f(),
					l("--tw-skew-x", `skewX(${p})`),
					l("--tw-skew-y", `skewY(${p})`),
					l("transform", n),
				],
			}),
				i("skew-x", {
					supportsNegative: !0,
					themeKeys: ["--skew"],
					handleBareValue: ({ value: p }) => (V(p) ? `${p}deg` : null),
					handle: (p) => [
						f(),
						l("--tw-skew-x", `skewX(${p})`),
						l("transform", n),
					],
				}),
				i("skew-y", {
					supportsNegative: !0,
					themeKeys: ["--skew"],
					handleBareValue: ({ value: p }) => (V(p) ? `${p}deg` : null),
					handle: (p) => [
						f(),
						l("--tw-skew-y", `skewY(${p})`),
						l("transform", n),
					],
				}),
				o("skew", () => [
					{
						supportsNegative: !0,
						values: ["0", "1", "2", "3", "6", "12"],
						valueThemeKeys: ["--skew"],
					},
				]),
				o("skew-x", () => [
					{
						supportsNegative: !0,
						values: ["0", "1", "2", "3", "6", "12"],
						valueThemeKeys: ["--skew"],
					},
				]),
				o("skew-y", () => [
					{
						supportsNegative: !0,
						values: ["0", "1", "2", "3", "6", "12"],
						valueThemeKeys: ["--skew"],
					},
				]),
				r.functional("transform", (p) => {
					if (p.modifier) return
					let x = null
					if (
						(p.value
							? p.value.kind === "arbitrary" && (x = p.value.value)
							: (x = n),
						x !== null)
					)
						return [f(), l("transform", x)]
				}),
				o("transform", () => [{ hasDefaultValue: !0 }]),
				e("transform-cpu", [["transform", n]]),
				e("transform-gpu", [["transform", `translateZ(0) ${n}`]]),
				e("transform-none", [["transform", "none"]])
		}
		e("transform-flat", [["transform-style", "flat"]]),
			e("transform-3d", [["transform-style", "preserve-3d"]]),
			e("transform-content", [["transform-box", "content-box"]]),
			e("transform-border", [["transform-box", "border-box"]]),
			e("transform-fill", [["transform-box", "fill-box"]]),
			e("transform-stroke", [["transform-box", "stroke-box"]]),
			e("transform-view", [["transform-box", "view-box"]]),
			e("backface-visible", [["backface-visibility", "visible"]]),
			e("backface-hidden", [["backface-visibility", "hidden"]])
		for (const n of [
			"auto",
			"default",
			"pointer",
			"wait",
			"text",
			"move",
			"help",
			"not-allowed",
			"none",
			"context-menu",
			"progress",
			"cell",
			"crosshair",
			"vertical-text",
			"alias",
			"copy",
			"no-drop",
			"grab",
			"grabbing",
			"all-scroll",
			"col-resize",
			"row-resize",
			"n-resize",
			"e-resize",
			"s-resize",
			"w-resize",
			"ne-resize",
			"nw-resize",
			"se-resize",
			"sw-resize",
			"ew-resize",
			"ns-resize",
			"nesw-resize",
			"nwse-resize",
			"zoom-in",
			"zoom-out",
		])
			e(`cursor-${n}`, [["cursor", n]])
		i("cursor", { themeKeys: ["--cursor"], handle: (n) => [l("cursor", n)] })
		for (const n of ["auto", "none", "manipulation"])
			e(`touch-${n}`, [["touch-action", n]])
		const h = () => U([C("--tw-pan-x"), C("--tw-pan-y"), C("--tw-pinch-zoom")])
		for (const n of ["x", "left", "right"])
			e(`touch-pan-${n}`, [
				h,
				["--tw-pan-x", `pan-${n}`],
				[
					"touch-action",
					"var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)",
				],
			])
		for (const n of ["y", "up", "down"])
			e(`touch-pan-${n}`, [
				h,
				["--tw-pan-y", `pan-${n}`],
				[
					"touch-action",
					"var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)",
				],
			])
		e("touch-pinch-zoom", [
			h,
			["--tw-pinch-zoom", "pinch-zoom"],
			[
				"touch-action",
				"var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)",
			],
		])
		for (const n of ["none", "text", "all", "auto"])
			e(`select-${n}`, [
				["-webkit-user-select", n],
				["user-select", n],
			])
		e("resize-none", [["resize", "none"]]),
			e("resize-x", [["resize", "horizontal"]]),
			e("resize-y", [["resize", "vertical"]]),
			e("resize", [["resize", "both"]]),
			e("snap-none", [["scroll-snap-type", "none"]])
		const k = () => U([C("--tw-scroll-snap-strictness", "proximity", "*")])
		for (const n of ["x", "y", "both"])
			e(`snap-${n}`, [
				k,
				["scroll-snap-type", `${n} var(--tw-scroll-snap-strictness)`],
			])
		e("snap-mandatory", [k, ["--tw-scroll-snap-strictness", "mandatory"]]),
			e("snap-proximity", [k, ["--tw-scroll-snap-strictness", "proximity"]]),
			e("snap-align-none", [["scroll-snap-align", "none"]]),
			e("snap-start", [["scroll-snap-align", "start"]]),
			e("snap-end", [["scroll-snap-align", "end"]]),
			e("snap-center", [["scroll-snap-align", "center"]]),
			e("snap-normal", [["scroll-snap-stop", "normal"]]),
			e("snap-always", [["scroll-snap-stop", "always"]])
		for (const [n, f] of [
			["scroll-m", "scroll-margin"],
			["scroll-mx", "scroll-margin-inline"],
			["scroll-my", "scroll-margin-block"],
			["scroll-ms", "scroll-margin-inline-start"],
			["scroll-me", "scroll-margin-inline-end"],
			["scroll-mt", "scroll-margin-top"],
			["scroll-mr", "scroll-margin-right"],
			["scroll-mb", "scroll-margin-bottom"],
			["scroll-ml", "scroll-margin-left"],
		])
			a(n, ["--scroll-margin", "--spacing"], (p) => [l(f, p)], {
				supportsNegative: !0,
			})
		for (const [n, f] of [
			["scroll-p", "scroll-padding"],
			["scroll-px", "scroll-padding-inline"],
			["scroll-py", "scroll-padding-block"],
			["scroll-ps", "scroll-padding-inline-start"],
			["scroll-pe", "scroll-padding-inline-end"],
			["scroll-pt", "scroll-padding-top"],
			["scroll-pr", "scroll-padding-right"],
			["scroll-pb", "scroll-padding-bottom"],
			["scroll-pl", "scroll-padding-left"],
		])
			a(n, ["--scroll-padding", "--spacing"], (p) => [l(f, p)])
		e("list-inside", [["list-style-position", "inside"]]),
			e("list-outside", [["list-style-position", "outside"]]),
			e("list-none", [["list-style-type", "none"]]),
			e("list-disc", [["list-style-type", "disc"]]),
			e("list-decimal", [["list-style-type", "decimal"]]),
			i("list", {
				themeKeys: ["--list-style-type"],
				handle: (n) => [l("list-style-type", n)],
			}),
			e("list-image-none", [["list-style-image", "none"]]),
			i("list-image", {
				themeKeys: ["--list-style-image"],
				handle: (n) => [l("list-style-image", n)],
			}),
			e("appearance-none", [["appearance", "none"]]),
			e("appearance-auto", [["appearance", "auto"]]),
			e("scheme-normal", [["color-scheme", "normal"]]),
			e("scheme-dark", [["color-scheme", "dark"]]),
			e("scheme-light", [["color-scheme", "light"]]),
			e("scheme-light-dark", [["color-scheme", "light dark"]]),
			e("scheme-only-dark", [["color-scheme", "only dark"]]),
			e("scheme-only-light", [["color-scheme", "only light"]]),
			e("columns-auto", [["columns", "auto"]]),
			i("columns", {
				themeKeys: ["--columns", "--container"],
				handleBareValue: ({ value: n }) => (V(n) ? n : null),
				handle: (n) => [l("columns", n)],
			}),
			o("columns", () => [
				{
					values: Array.from({ length: 12 }, (n, f) => `${f + 1}`),
					valueThemeKeys: ["--columns", "--container"],
				},
			])
		for (const n of [
			"auto",
			"avoid",
			"all",
			"avoid-page",
			"page",
			"left",
			"right",
			"column",
		])
			e(`break-before-${n}`, [["break-before", n]])
		for (const n of ["auto", "avoid", "avoid-page", "avoid-column"])
			e(`break-inside-${n}`, [["break-inside", n]])
		for (const n of [
			"auto",
			"avoid",
			"all",
			"avoid-page",
			"page",
			"left",
			"right",
			"column",
		])
			e(`break-after-${n}`, [["break-after", n]])
		e("grid-flow-row", [["grid-auto-flow", "row"]]),
			e("grid-flow-col", [["grid-auto-flow", "column"]]),
			e("grid-flow-dense", [["grid-auto-flow", "dense"]]),
			e("grid-flow-row-dense", [["grid-auto-flow", "row dense"]]),
			e("grid-flow-col-dense", [["grid-auto-flow", "column dense"]]),
			e("auto-cols-auto", [["grid-auto-columns", "auto"]]),
			e("auto-cols-min", [["grid-auto-columns", "min-content"]]),
			e("auto-cols-max", [["grid-auto-columns", "max-content"]]),
			e("auto-cols-fr", [["grid-auto-columns", "minmax(0, 1fr)"]]),
			i("auto-cols", {
				themeKeys: ["--grid-auto-columns"],
				handle: (n) => [l("grid-auto-columns", n)],
			}),
			e("auto-rows-auto", [["grid-auto-rows", "auto"]]),
			e("auto-rows-min", [["grid-auto-rows", "min-content"]]),
			e("auto-rows-max", [["grid-auto-rows", "max-content"]]),
			e("auto-rows-fr", [["grid-auto-rows", "minmax(0, 1fr)"]]),
			i("auto-rows", {
				themeKeys: ["--grid-auto-rows"],
				handle: (n) => [l("grid-auto-rows", n)],
			}),
			e("grid-cols-none", [["grid-template-columns", "none"]]),
			e("grid-cols-subgrid", [["grid-template-columns", "subgrid"]]),
			i("grid-cols", {
				themeKeys: ["--grid-template-columns"],
				handleBareValue: ({ value: n }) =>
					St(n) ? `repeat(${n}, minmax(0, 1fr))` : null,
				handle: (n) => [l("grid-template-columns", n)],
			}),
			e("grid-rows-none", [["grid-template-rows", "none"]]),
			e("grid-rows-subgrid", [["grid-template-rows", "subgrid"]]),
			i("grid-rows", {
				themeKeys: ["--grid-template-rows"],
				handleBareValue: ({ value: n }) =>
					St(n) ? `repeat(${n}, minmax(0, 1fr))` : null,
				handle: (n) => [l("grid-template-rows", n)],
			}),
			o("grid-cols", () => [
				{
					values: Array.from({ length: 12 }, (n, f) => `${f + 1}`),
					valueThemeKeys: ["--grid-template-columns"],
				},
			]),
			o("grid-rows", () => [
				{
					values: Array.from({ length: 12 }, (n, f) => `${f + 1}`),
					valueThemeKeys: ["--grid-template-rows"],
				},
			]),
			e("flex-row", [["flex-direction", "row"]]),
			e("flex-row-reverse", [["flex-direction", "row-reverse"]]),
			e("flex-col", [["flex-direction", "column"]]),
			e("flex-col-reverse", [["flex-direction", "column-reverse"]]),
			e("flex-wrap", [["flex-wrap", "wrap"]]),
			e("flex-nowrap", [["flex-wrap", "nowrap"]]),
			e("flex-wrap-reverse", [["flex-wrap", "wrap-reverse"]]),
			e("place-content-center", [["place-content", "center"]]),
			e("place-content-start", [["place-content", "start"]]),
			e("place-content-end", [["place-content", "end"]]),
			e("place-content-center-safe", [["place-content", "safe center"]]),
			e("place-content-end-safe", [["place-content", "safe end"]]),
			e("place-content-between", [["place-content", "space-between"]]),
			e("place-content-around", [["place-content", "space-around"]]),
			e("place-content-evenly", [["place-content", "space-evenly"]]),
			e("place-content-baseline", [["place-content", "baseline"]]),
			e("place-content-stretch", [["place-content", "stretch"]]),
			e("place-items-center", [["place-items", "center"]]),
			e("place-items-start", [["place-items", "start"]]),
			e("place-items-end", [["place-items", "end"]]),
			e("place-items-center-safe", [["place-items", "safe center"]]),
			e("place-items-end-safe", [["place-items", "safe end"]]),
			e("place-items-baseline", [["place-items", "baseline"]]),
			e("place-items-stretch", [["place-items", "stretch"]]),
			e("content-normal", [["align-content", "normal"]]),
			e("content-center", [["align-content", "center"]]),
			e("content-start", [["align-content", "flex-start"]]),
			e("content-end", [["align-content", "flex-end"]]),
			e("content-center-safe", [["align-content", "safe center"]]),
			e("content-end-safe", [["align-content", "safe flex-end"]]),
			e("content-between", [["align-content", "space-between"]]),
			e("content-around", [["align-content", "space-around"]]),
			e("content-evenly", [["align-content", "space-evenly"]]),
			e("content-baseline", [["align-content", "baseline"]]),
			e("content-stretch", [["align-content", "stretch"]]),
			e("items-center", [["align-items", "center"]]),
			e("items-start", [["align-items", "flex-start"]]),
			e("items-end", [["align-items", "flex-end"]]),
			e("items-center-safe", [["align-items", "safe center"]]),
			e("items-end-safe", [["align-items", "safe flex-end"]]),
			e("items-baseline", [["align-items", "baseline"]]),
			e("items-baseline-last", [["align-items", "last baseline"]]),
			e("items-stretch", [["align-items", "stretch"]]),
			e("justify-normal", [["justify-content", "normal"]]),
			e("justify-center", [["justify-content", "center"]]),
			e("justify-start", [["justify-content", "flex-start"]]),
			e("justify-end", [["justify-content", "flex-end"]]),
			e("justify-center-safe", [["justify-content", "safe center"]]),
			e("justify-end-safe", [["justify-content", "safe flex-end"]]),
			e("justify-between", [["justify-content", "space-between"]]),
			e("justify-around", [["justify-content", "space-around"]]),
			e("justify-evenly", [["justify-content", "space-evenly"]]),
			e("justify-baseline", [["justify-content", "baseline"]]),
			e("justify-stretch", [["justify-content", "stretch"]]),
			e("justify-items-normal", [["justify-items", "normal"]]),
			e("justify-items-center", [["justify-items", "center"]]),
			e("justify-items-start", [["justify-items", "start"]]),
			e("justify-items-end", [["justify-items", "end"]]),
			e("justify-items-center-safe", [["justify-items", "safe center"]]),
			e("justify-items-end-safe", [["justify-items", "safe end"]]),
			e("justify-items-stretch", [["justify-items", "stretch"]]),
			a("gap", ["--gap", "--spacing"], (n) => [l("gap", n)]),
			a("gap-x", ["--gap", "--spacing"], (n) => [l("column-gap", n)]),
			a("gap-y", ["--gap", "--spacing"], (n) => [l("row-gap", n)]),
			a(
				"space-x",
				["--space", "--spacing"],
				(n) => [
					U([C("--tw-space-x-reverse", "0")]),
					I(":where(& > :not(:last-child))", [
						l("--tw-sort", "row-gap"),
						l("--tw-space-x-reverse", "0"),
						l("margin-inline-start", `calc(${n} * var(--tw-space-x-reverse))`),
						l(
							"margin-inline-end",
							`calc(${n} * calc(1 - var(--tw-space-x-reverse)))`,
						),
					]),
				],
				{ supportsNegative: !0 },
			),
			a(
				"space-y",
				["--space", "--spacing"],
				(n) => [
					U([C("--tw-space-y-reverse", "0")]),
					I(":where(& > :not(:last-child))", [
						l("--tw-sort", "column-gap"),
						l("--tw-space-y-reverse", "0"),
						l("margin-block-start", `calc(${n} * var(--tw-space-y-reverse))`),
						l(
							"margin-block-end",
							`calc(${n} * calc(1 - var(--tw-space-y-reverse)))`,
						),
					]),
				],
				{ supportsNegative: !0 },
			),
			e("space-x-reverse", [
				() => U([C("--tw-space-x-reverse", "0")]),
				() =>
					I(":where(& > :not(:last-child))", [
						l("--tw-sort", "row-gap"),
						l("--tw-space-x-reverse", "1"),
					]),
			]),
			e("space-y-reverse", [
				() => U([C("--tw-space-y-reverse", "0")]),
				() =>
					I(":where(& > :not(:last-child))", [
						l("--tw-sort", "column-gap"),
						l("--tw-space-y-reverse", "1"),
					]),
			]),
			e("accent-auto", [["accent-color", "auto"]]),
			s("accent", {
				themeKeys: ["--accent-color", "--color"],
				handle: (n) => [l("accent-color", n)],
			}),
			s("caret", {
				themeKeys: ["--caret-color", "--color"],
				handle: (n) => [l("caret-color", n)],
			}),
			s("divide", {
				themeKeys: ["--divide-color", "--color"],
				handle: (n) => [
					I(":where(& > :not(:last-child))", [
						l("--tw-sort", "divide-color"),
						l("border-color", n),
					]),
				],
			}),
			e("place-self-auto", [["place-self", "auto"]]),
			e("place-self-start", [["place-self", "start"]]),
			e("place-self-end", [["place-self", "end"]]),
			e("place-self-center", [["place-self", "center"]]),
			e("place-self-end-safe", [["place-self", "safe end"]]),
			e("place-self-center-safe", [["place-self", "safe center"]]),
			e("place-self-stretch", [["place-self", "stretch"]]),
			e("self-auto", [["align-self", "auto"]]),
			e("self-start", [["align-self", "flex-start"]]),
			e("self-end", [["align-self", "flex-end"]]),
			e("self-center", [["align-self", "center"]]),
			e("self-end-safe", [["align-self", "safe flex-end"]]),
			e("self-center-safe", [["align-self", "safe center"]]),
			e("self-stretch", [["align-self", "stretch"]]),
			e("self-baseline", [["align-self", "baseline"]]),
			e("self-baseline-last", [["align-self", "last baseline"]]),
			e("justify-self-auto", [["justify-self", "auto"]]),
			e("justify-self-start", [["justify-self", "flex-start"]]),
			e("justify-self-end", [["justify-self", "flex-end"]]),
			e("justify-self-center", [["justify-self", "center"]]),
			e("justify-self-end-safe", [["justify-self", "safe flex-end"]]),
			e("justify-self-center-safe", [["justify-self", "safe center"]]),
			e("justify-self-stretch", [["justify-self", "stretch"]])
		for (const n of ["auto", "hidden", "clip", "visible", "scroll"])
			e(`overflow-${n}`, [["overflow", n]]),
				e(`overflow-x-${n}`, [["overflow-x", n]]),
				e(`overflow-y-${n}`, [["overflow-y", n]])
		for (const n of ["auto", "contain", "none"])
			e(`overscroll-${n}`, [["overscroll-behavior", n]]),
				e(`overscroll-x-${n}`, [["overscroll-behavior-x", n]]),
				e(`overscroll-y-${n}`, [["overscroll-behavior-y", n]])
		e("scroll-auto", [["scroll-behavior", "auto"]]),
			e("scroll-smooth", [["scroll-behavior", "smooth"]]),
			e("truncate", [
				["overflow", "hidden"],
				["text-overflow", "ellipsis"],
				["white-space", "nowrap"],
			]),
			e("text-ellipsis", [["text-overflow", "ellipsis"]]),
			e("text-clip", [["text-overflow", "clip"]]),
			e("hyphens-none", [
				["-webkit-hyphens", "none"],
				["hyphens", "none"],
			]),
			e("hyphens-manual", [
				["-webkit-hyphens", "manual"],
				["hyphens", "manual"],
			]),
			e("hyphens-auto", [
				["-webkit-hyphens", "auto"],
				["hyphens", "auto"],
			]),
			e("whitespace-normal", [["white-space", "normal"]]),
			e("whitespace-nowrap", [["white-space", "nowrap"]]),
			e("whitespace-pre", [["white-space", "pre"]]),
			e("whitespace-pre-line", [["white-space", "pre-line"]]),
			e("whitespace-pre-wrap", [["white-space", "pre-wrap"]]),
			e("whitespace-break-spaces", [["white-space", "break-spaces"]]),
			e("text-wrap", [["text-wrap", "wrap"]]),
			e("text-nowrap", [["text-wrap", "nowrap"]]),
			e("text-balance", [["text-wrap", "balance"]]),
			e("text-pretty", [["text-wrap", "pretty"]]),
			e("break-normal", [
				["overflow-wrap", "normal"],
				["word-break", "normal"],
			]),
			e("break-words", [["overflow-wrap", "break-word"]]),
			e("break-all", [["word-break", "break-all"]]),
			e("break-keep", [["word-break", "keep-all"]]),
			e("wrap-anywhere", [["overflow-wrap", "anywhere"]]),
			e("wrap-break-word", [["overflow-wrap", "break-word"]]),
			e("wrap-normal", [["overflow-wrap", "normal"]])
		for (const [n, f] of [
			["rounded", ["border-radius"]],
			["rounded-s", ["border-start-start-radius", "border-end-start-radius"]],
			["rounded-e", ["border-start-end-radius", "border-end-end-radius"]],
			["rounded-t", ["border-top-left-radius", "border-top-right-radius"]],
			["rounded-r", ["border-top-right-radius", "border-bottom-right-radius"]],
			[
				"rounded-b",
				["border-bottom-right-radius", "border-bottom-left-radius"],
			],
			["rounded-l", ["border-top-left-radius", "border-bottom-left-radius"]],
			["rounded-ss", ["border-start-start-radius"]],
			["rounded-se", ["border-start-end-radius"]],
			["rounded-ee", ["border-end-end-radius"]],
			["rounded-es", ["border-end-start-radius"]],
			["rounded-tl", ["border-top-left-radius"]],
			["rounded-tr", ["border-top-right-radius"]],
			["rounded-br", ["border-bottom-right-radius"]],
			["rounded-bl", ["border-bottom-left-radius"]],
		])
			e(
				`${n}-none`,
				f.map((p) => [p, "0"]),
			),
				e(
					`${n}-full`,
					f.map((p) => [p, "calc(infinity * 1px)"]),
				),
				i(n, { themeKeys: ["--radius"], handle: (p) => f.map((x) => l(x, p)) })
		e("border-solid", [
			["--tw-border-style", "solid"],
			["border-style", "solid"],
		]),
			e("border-dashed", [
				["--tw-border-style", "dashed"],
				["border-style", "dashed"],
			]),
			e("border-dotted", [
				["--tw-border-style", "dotted"],
				["border-style", "dotted"],
			]),
			e("border-double", [
				["--tw-border-style", "double"],
				["border-style", "double"],
			]),
			e("border-hidden", [
				["--tw-border-style", "hidden"],
				["border-style", "hidden"],
			]),
			e("border-none", [
				["--tw-border-style", "none"],
				["border-style", "none"],
			])
		{
			const f = (p, x) => {
				r.functional(p, (w) => {
					if (!w.value) {
						if (w.modifier) return
						const N = t.get(["--default-border-width"]) ?? "1px",
							O = x.width(N)
						return O ? [n(), ...O] : void 0
					}
					if (w.value.kind === "arbitrary") {
						let N = w.value.value
						switch (
							w.value.dataType ??
							B(N, ["color", "line-width", "length"])
						) {
							case "line-width":
							case "length": {
								if (w.modifier) return
								const $ = x.width(N)
								return $ ? [n(), ...$] : void 0
							}
							default:
								return (
									(N = Q(N, w.modifier, t)), N === null ? void 0 : x.color(N)
								)
						}
					}
					{
						const N = Z(w, t, ["--border-color", "--color"])
						if (N) return x.color(N)
					}
					{
						if (w.modifier) return
						const N = t.resolve(w.value.value, ["--border-width"])
						if (N) {
							const O = x.width(N)
							return O ? [n(), ...O] : void 0
						}
						if (V(w.value.value)) {
							const O = x.width(`${w.value.value}px`)
							return O ? [n(), ...O] : void 0
						}
					}
				}),
					o(p, () => [
						{
							values: ["current", "inherit", "transparent"],
							valueThemeKeys: ["--border-color", "--color"],
							modifiers: Array.from({ length: 21 }, (w, N) => `${N * 5}`),
							hasDefaultValue: !0,
						},
						{
							values: ["0", "2", "4", "8"],
							valueThemeKeys: ["--border-width"],
						},
					])
			}
			var G = f
			const n = () => U([C("--tw-border-style", "solid")])
			f("border", {
				width: (p) => [
					l("border-style", "var(--tw-border-style)"),
					l("border-width", p),
				],
				color: (p) => [l("border-color", p)],
			}),
				f("border-x", {
					width: (p) => [
						l("border-inline-style", "var(--tw-border-style)"),
						l("border-inline-width", p),
					],
					color: (p) => [l("border-inline-color", p)],
				}),
				f("border-y", {
					width: (p) => [
						l("border-block-style", "var(--tw-border-style)"),
						l("border-block-width", p),
					],
					color: (p) => [l("border-block-color", p)],
				}),
				f("border-s", {
					width: (p) => [
						l("border-inline-start-style", "var(--tw-border-style)"),
						l("border-inline-start-width", p),
					],
					color: (p) => [l("border-inline-start-color", p)],
				}),
				f("border-e", {
					width: (p) => [
						l("border-inline-end-style", "var(--tw-border-style)"),
						l("border-inline-end-width", p),
					],
					color: (p) => [l("border-inline-end-color", p)],
				}),
				f("border-t", {
					width: (p) => [
						l("border-top-style", "var(--tw-border-style)"),
						l("border-top-width", p),
					],
					color: (p) => [l("border-top-color", p)],
				}),
				f("border-r", {
					width: (p) => [
						l("border-right-style", "var(--tw-border-style)"),
						l("border-right-width", p),
					],
					color: (p) => [l("border-right-color", p)],
				}),
				f("border-b", {
					width: (p) => [
						l("border-bottom-style", "var(--tw-border-style)"),
						l("border-bottom-width", p),
					],
					color: (p) => [l("border-bottom-color", p)],
				}),
				f("border-l", {
					width: (p) => [
						l("border-left-style", "var(--tw-border-style)"),
						l("border-left-width", p),
					],
					color: (p) => [l("border-left-color", p)],
				}),
				i("divide-x", {
					defaultValue: t.get(["--default-border-width"]) ?? "1px",
					themeKeys: ["--divide-width", "--border-width"],
					handleBareValue: ({ value: p }) => (V(p) ? `${p}px` : null),
					handle: (p) => [
						U([C("--tw-divide-x-reverse", "0")]),
						I(":where(& > :not(:last-child))", [
							l("--tw-sort", "divide-x-width"),
							n(),
							l("--tw-divide-x-reverse", "0"),
							l("border-inline-style", "var(--tw-border-style)"),
							l(
								"border-inline-start-width",
								`calc(${p} * var(--tw-divide-x-reverse))`,
							),
							l(
								"border-inline-end-width",
								`calc(${p} * calc(1 - var(--tw-divide-x-reverse)))`,
							),
						]),
					],
				}),
				i("divide-y", {
					defaultValue: t.get(["--default-border-width"]) ?? "1px",
					themeKeys: ["--divide-width", "--border-width"],
					handleBareValue: ({ value: p }) => (V(p) ? `${p}px` : null),
					handle: (p) => [
						U([C("--tw-divide-y-reverse", "0")]),
						I(":where(& > :not(:last-child))", [
							l("--tw-sort", "divide-y-width"),
							n(),
							l("--tw-divide-y-reverse", "0"),
							l("border-bottom-style", "var(--tw-border-style)"),
							l("border-top-style", "var(--tw-border-style)"),
							l("border-top-width", `calc(${p} * var(--tw-divide-y-reverse))`),
							l(
								"border-bottom-width",
								`calc(${p} * calc(1 - var(--tw-divide-y-reverse)))`,
							),
						]),
					],
				}),
				o("divide-x", () => [
					{
						values: ["0", "2", "4", "8"],
						valueThemeKeys: ["--divide-width", "--border-width"],
						hasDefaultValue: !0,
					},
				]),
				o("divide-y", () => [
					{
						values: ["0", "2", "4", "8"],
						valueThemeKeys: ["--divide-width", "--border-width"],
						hasDefaultValue: !0,
					},
				]),
				e("divide-x-reverse", [
					() => U([C("--tw-divide-x-reverse", "0")]),
					() =>
						I(":where(& > :not(:last-child))", [
							l("--tw-divide-x-reverse", "1"),
						]),
				]),
				e("divide-y-reverse", [
					() => U([C("--tw-divide-y-reverse", "0")]),
					() =>
						I(":where(& > :not(:last-child))", [
							l("--tw-divide-y-reverse", "1"),
						]),
				])
			for (const p of ["solid", "dashed", "dotted", "double", "none"])
				e(`divide-${p}`, [
					() =>
						I(":where(& > :not(:last-child))", [
							l("--tw-sort", "divide-style"),
							l("--tw-border-style", p),
							l("border-style", p),
						]),
				])
		}
		e("bg-auto", [["background-size", "auto"]]),
			e("bg-cover", [["background-size", "cover"]]),
			e("bg-contain", [["background-size", "contain"]]),
			i("bg-size", {
				handle(n) {
					if (n) return [l("background-size", n)]
				},
			}),
			e("bg-fixed", [["background-attachment", "fixed"]]),
			e("bg-local", [["background-attachment", "local"]]),
			e("bg-scroll", [["background-attachment", "scroll"]]),
			e("bg-top", [["background-position", "top"]]),
			e("bg-top-left", [["background-position", "left top"]]),
			e("bg-top-right", [["background-position", "right top"]]),
			e("bg-bottom", [["background-position", "bottom"]]),
			e("bg-bottom-left", [["background-position", "left bottom"]]),
			e("bg-bottom-right", [["background-position", "right bottom"]]),
			e("bg-left", [["background-position", "left"]]),
			e("bg-right", [["background-position", "right"]]),
			e("bg-center", [["background-position", "center"]]),
			i("bg-position", {
				handle(n) {
					if (n) return [l("background-position", n)]
				},
			}),
			e("bg-repeat", [["background-repeat", "repeat"]]),
			e("bg-no-repeat", [["background-repeat", "no-repeat"]]),
			e("bg-repeat-x", [["background-repeat", "repeat-x"]]),
			e("bg-repeat-y", [["background-repeat", "repeat-y"]]),
			e("bg-repeat-round", [["background-repeat", "round"]]),
			e("bg-repeat-space", [["background-repeat", "space"]]),
			e("bg-none", [["background-image", "none"]])
		{
			const p = (N) => {
					let O = "in oklab"
					if (N?.kind === "named")
						switch (N.value) {
							case "longer":
							case "shorter":
							case "increasing":
							case "decreasing":
								O = `in oklch ${N.value} hue`
								break
							default:
								O = `in ${N.value}`
						}
					else N?.kind === "arbitrary" && (O = N.value)
					return O
				},
				x =
					({ negative: N }) =>
					(O) => {
						if (!O.value) return
						if (O.value.kind === "arbitrary") {
							if (O.modifier) return
							let z = O.value.value
							switch (O.value.dataType ?? B(z, ["angle"])) {
								case "angle":
									return (
										(z = N ? `calc(${z} * -1)` : `${z}`),
										[
											l("--tw-gradient-position", z),
											l(
												"background-image",
												`linear-gradient(var(--tw-gradient-stops,${z}))`,
											),
										]
									)
								default:
									return N
										? void 0
										: [
												l("--tw-gradient-position", z),
												l(
													"background-image",
													`linear-gradient(var(--tw-gradient-stops,${z}))`,
												),
											]
							}
						}
						let $ = O.value.value
						if (!N && f.has($)) $ = f.get($)
						else if (V($)) $ = N ? `calc(${$}deg * -1)` : `${$}deg`
						else return
						const S = p(O.modifier)
						return [
							l("--tw-gradient-position", `${$}`),
							M(
								"@supports (background-image: linear-gradient(in lab, red, red))",
								[l("--tw-gradient-position", `${$} ${S}`)],
							),
							l(
								"background-image",
								"linear-gradient(var(--tw-gradient-stops))",
							),
						]
					},
				w =
					({ negative: N }) =>
					(O) => {
						if (O.value?.kind === "arbitrary") {
							if (O.modifier) return
							const z = O.value.value
							return [
								l("--tw-gradient-position", z),
								l(
									"background-image",
									`conic-gradient(var(--tw-gradient-stops,${z}))`,
								),
							]
						}
						const $ = p(O.modifier)
						if (!O.value)
							return [
								l("--tw-gradient-position", $),
								l(
									"background-image",
									"conic-gradient(var(--tw-gradient-stops))",
								),
							]
						let S = O.value.value
						if (V(S))
							return (
								(S = N ? `calc(${S}deg * -1)` : `${S}deg`),
								[
									l("--tw-gradient-position", `from ${S} ${$}`),
									l(
										"background-image",
										"conic-gradient(var(--tw-gradient-stops))",
									),
								]
							)
					}
			var F = p,
				W = x,
				ue = w
			const n = [
					"oklab",
					"oklch",
					"srgb",
					"hsl",
					"longer",
					"shorter",
					"increasing",
					"decreasing",
				],
				f = new Map([
					["to-t", "to top"],
					["to-tr", "to top right"],
					["to-r", "to right"],
					["to-br", "to bottom right"],
					["to-b", "to bottom"],
					["to-bl", "to bottom left"],
					["to-l", "to left"],
					["to-tl", "to top left"],
				])
			r.functional("-bg-linear", x({ negative: !0 })),
				r.functional("bg-linear", x({ negative: !1 })),
				o("bg-linear", () => [
					{ values: [...f.keys()], modifiers: n },
					{
						values: [
							"0",
							"30",
							"60",
							"90",
							"120",
							"150",
							"180",
							"210",
							"240",
							"270",
							"300",
							"330",
						],
						supportsNegative: !0,
						modifiers: n,
					},
				]),
				r.functional("-bg-conic", w({ negative: !0 })),
				r.functional("bg-conic", w({ negative: !1 })),
				o("bg-conic", () => [
					{ hasDefaultValue: !0, modifiers: n },
					{
						values: [
							"0",
							"30",
							"60",
							"90",
							"120",
							"150",
							"180",
							"210",
							"240",
							"270",
							"300",
							"330",
						],
						supportsNegative: !0,
						modifiers: n,
					},
				]),
				r.functional("bg-radial", (N) => {
					if (!N.value) {
						const O = p(N.modifier)
						return [
							l("--tw-gradient-position", O),
							l(
								"background-image",
								"radial-gradient(var(--tw-gradient-stops))",
							),
						]
					}
					if (N.value.kind === "arbitrary") {
						if (N.modifier) return
						const O = N.value.value
						return [
							l("--tw-gradient-position", O),
							l(
								"background-image",
								`radial-gradient(var(--tw-gradient-stops,${O}))`,
							),
						]
					}
				}),
				o("bg-radial", () => [{ hasDefaultValue: !0, modifiers: n }])
		}
		r.functional("bg", (n) => {
			if (n.value) {
				if (n.value.kind === "arbitrary") {
					let f = n.value.value
					switch (
						n.value.dataType ??
						B(f, [
							"image",
							"color",
							"percentage",
							"position",
							"bg-size",
							"length",
							"url",
						])
					) {
						case "percentage":
						case "position":
							return n.modifier ? void 0 : [l("background-position", f)]
						case "bg-size":
						case "length":
						case "size":
							return n.modifier ? void 0 : [l("background-size", f)]
						case "image":
						case "url":
							return n.modifier ? void 0 : [l("background-image", f)]
						default:
							return (
								(f = Q(f, n.modifier, t)),
								f === null ? void 0 : [l("background-color", f)]
							)
					}
				}
				{
					const f = Z(n, t, ["--background-color", "--color"])
					if (f) return [l("background-color", f)]
				}
				{
					if (n.modifier) return
					const f = t.resolve(n.value.value, ["--background-image"])
					if (f) return [l("background-image", f)]
				}
			}
		}),
			o("bg", () => [
				{
					values: ["current", "inherit", "transparent"],
					valueThemeKeys: ["--background-color", "--color"],
					modifiers: Array.from({ length: 21 }, (n, f) => `${f * 5}`),
				},
				{ values: [], valueThemeKeys: ["--background-image"] },
			])
		const v = () =>
			U([
				C("--tw-gradient-position"),
				C("--tw-gradient-from", "#0000", "<color>"),
				C("--tw-gradient-via", "#0000", "<color>"),
				C("--tw-gradient-to", "#0000", "<color>"),
				C("--tw-gradient-stops"),
				C("--tw-gradient-via-stops"),
				C("--tw-gradient-from-position", "0%", "<length-percentage>"),
				C("--tw-gradient-via-position", "50%", "<length-percentage>"),
				C("--tw-gradient-to-position", "100%", "<length-percentage>"),
			])
		function A(n, f) {
			r.functional(n, (p) => {
				if (p.value) {
					if (p.value.kind === "arbitrary") {
						let x = p.value.value
						switch (
							p.value.dataType ??
							B(x, ["color", "length", "percentage"])
						) {
							case "length":
							case "percentage":
								return p.modifier ? void 0 : f.position(x)
							default:
								return (
									(x = Q(x, p.modifier, t)), x === null ? void 0 : f.color(x)
								)
						}
					}
					{
						const x = Z(p, t, ["--background-color", "--color"])
						if (x) return f.color(x)
					}
					{
						if (p.modifier) return
						const x = t.resolve(p.value.value, [
							"--gradient-color-stop-positions",
						])
						if (x) return f.position(x)
						if (
							p.value.value[p.value.value.length - 1] === "%" &&
							V(p.value.value.slice(0, -1))
						)
							return f.position(p.value.value)
					}
				}
			}),
				o(n, () => [
					{
						values: ["current", "inherit", "transparent"],
						valueThemeKeys: ["--background-color", "--color"],
						modifiers: Array.from({ length: 21 }, (p, x) => `${x * 5}`),
					},
					{
						values: Array.from({ length: 21 }, (p, x) => `${x * 5}%`),
						valueThemeKeys: ["--gradient-color-stop-positions"],
					},
				])
		}
		A("from", {
			color: (n) => [
				v(),
				l("--tw-sort", "--tw-gradient-from"),
				l("--tw-gradient-from", n),
				l(
					"--tw-gradient-stops",
					"var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
				),
			],
			position: (n) => [v(), l("--tw-gradient-from-position", n)],
		}),
			e("via-none", [["--tw-gradient-via-stops", "initial"]]),
			A("via", {
				color: (n) => [
					v(),
					l("--tw-sort", "--tw-gradient-via"),
					l("--tw-gradient-via", n),
					l(
						"--tw-gradient-via-stops",
						"var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position)",
					),
					l("--tw-gradient-stops", "var(--tw-gradient-via-stops)"),
				],
				position: (n) => [v(), l("--tw-gradient-via-position", n)],
			}),
			A("to", {
				color: (n) => [
					v(),
					l("--tw-sort", "--tw-gradient-to"),
					l("--tw-gradient-to", n),
					l(
						"--tw-gradient-stops",
						"var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
					),
				],
				position: (n) => [v(), l("--tw-gradient-to-position", n)],
			}),
			e("mask-none", [["mask-image", "none"]]),
			r.functional("mask", (n) => {
				if (!n.value || n.modifier || n.value.kind !== "arbitrary") return
				const f = n.value.value
				switch (
					n.value.dataType ??
					B(f, ["image", "percentage", "position", "bg-size", "length", "url"])
				) {
					case "percentage":
					case "position":
						return n.modifier ? void 0 : [l("mask-position", f)]
					case "bg-size":
					case "length":
					case "size":
						return [l("mask-size", f)]
					case "image":
					case "url":
					default:
						return [l("mask-image", f)]
				}
			}),
			e("mask-add", [["mask-composite", "add"]]),
			e("mask-subtract", [["mask-composite", "subtract"]]),
			e("mask-intersect", [["mask-composite", "intersect"]]),
			e("mask-exclude", [["mask-composite", "exclude"]]),
			e("mask-alpha", [["mask-mode", "alpha"]]),
			e("mask-luminance", [["mask-mode", "luminance"]]),
			e("mask-match", [["mask-mode", "match-source"]]),
			e("mask-type-alpha", [["mask-type", "alpha"]]),
			e("mask-type-luminance", [["mask-type", "luminance"]]),
			e("mask-auto", [["mask-size", "auto"]]),
			e("mask-cover", [["mask-size", "cover"]]),
			e("mask-contain", [["mask-size", "contain"]]),
			i("mask-size", {
				handle(n) {
					if (n) return [l("mask-size", n)]
				},
			}),
			e("mask-top", [["mask-position", "top"]]),
			e("mask-top-left", [["mask-position", "left top"]]),
			e("mask-top-right", [["mask-position", "right top"]]),
			e("mask-bottom", [["mask-position", "bottom"]]),
			e("mask-bottom-left", [["mask-position", "left bottom"]]),
			e("mask-bottom-right", [["mask-position", "right bottom"]]),
			e("mask-left", [["mask-position", "left"]]),
			e("mask-right", [["mask-position", "right"]]),
			e("mask-center", [["mask-position", "center"]]),
			i("mask-position", {
				handle(n) {
					if (n) return [l("mask-position", n)]
				},
			}),
			e("mask-repeat", [["mask-repeat", "repeat"]]),
			e("mask-no-repeat", [["mask-repeat", "no-repeat"]]),
			e("mask-repeat-x", [["mask-repeat", "repeat-x"]]),
			e("mask-repeat-y", [["mask-repeat", "repeat-y"]]),
			e("mask-repeat-round", [["mask-repeat", "round"]]),
			e("mask-repeat-space", [["mask-repeat", "space"]]),
			e("mask-clip-border", [["mask-clip", "border-box"]]),
			e("mask-clip-padding", [["mask-clip", "padding-box"]]),
			e("mask-clip-content", [["mask-clip", "content-box"]]),
			e("mask-clip-fill", [["mask-clip", "fill-box"]]),
			e("mask-clip-stroke", [["mask-clip", "stroke-box"]]),
			e("mask-clip-view", [["mask-clip", "view-box"]]),
			e("mask-no-clip", [["mask-clip", "no-clip"]]),
			e("mask-origin-border", [["mask-origin", "border-box"]]),
			e("mask-origin-padding", [["mask-origin", "padding-box"]]),
			e("mask-origin-content", [["mask-origin", "content-box"]]),
			e("mask-origin-fill", [["mask-origin", "fill-box"]]),
			e("mask-origin-stroke", [["mask-origin", "stroke-box"]]),
			e("mask-origin-view", [["mask-origin", "view-box"]])
		const y = () =>
			U([
				C("--tw-mask-linear", "linear-gradient(#fff, #fff)"),
				C("--tw-mask-radial", "linear-gradient(#fff, #fff)"),
				C("--tw-mask-conic", "linear-gradient(#fff, #fff)"),
			])
		function b(n, f) {
			r.functional(n, (p) => {
				if (p.value) {
					if (p.value.kind === "arbitrary") {
						let x = p.value.value
						switch (
							p.value.dataType ??
							B(x, ["length", "percentage", "color"])
						) {
							case "color":
								return (
									(x = Q(x, p.modifier, t)), x === null ? void 0 : f.color(x)
								)
							case "percentage":
								return p.modifier || !V(x.slice(0, -1)) ? void 0 : f.position(x)
							default:
								return p.modifier ? void 0 : f.position(x)
						}
					}
					{
						const x = Z(p, t, ["--background-color", "--color"])
						if (x) return f.color(x)
					}
					{
						if (p.modifier) return
						const x = B(p.value.value, ["number", "percentage"])
						if (!x) return
						switch (x) {
							case "number": {
								const w = t.resolve(null, ["--spacing"])
								return !w || !we(p.value.value)
									? void 0
									: f.position(`calc(${w} * ${p.value.value})`)
							}
							case "percentage":
								return V(p.value.value.slice(0, -1))
									? f.position(p.value.value)
									: void 0
							default:
								return
						}
					}
				}
			}),
				o(n, () => [
					{
						values: ["current", "inherit", "transparent"],
						valueThemeKeys: ["--background-color", "--color"],
						modifiers: Array.from({ length: 21 }, (p, x) => `${x * 5}`),
					},
					{
						values: Array.from({ length: 21 }, (p, x) => `${x * 5}%`),
						valueThemeKeys: ["--gradient-color-stop-positions"],
					},
				]),
				o(n, () => [
					{ values: Array.from({ length: 21 }, (p, x) => `${x * 5}%`) },
					{ values: t.get(["--spacing"]) ? rt : [] },
					{
						values: ["current", "inherit", "transparent"],
						valueThemeKeys: ["--background-color", "--color"],
						modifiers: Array.from({ length: 21 }, (p, x) => `${x * 5}`),
					},
				])
		}
		const T = () =>
			U([
				C("--tw-mask-left", "linear-gradient(#fff, #fff)"),
				C("--tw-mask-right", "linear-gradient(#fff, #fff)"),
				C("--tw-mask-bottom", "linear-gradient(#fff, #fff)"),
				C("--tw-mask-top", "linear-gradient(#fff, #fff)"),
			])
		function E(n, f, p) {
			b(n, {
				color(x) {
					const w = [
						y(),
						T(),
						l(
							"mask-image",
							"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
						),
						l("mask-composite", "intersect"),
						l(
							"--tw-mask-linear",
							"var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)",
						),
					]
					for (const N of ["top", "right", "bottom", "left"])
						p[N] &&
							(w.push(
								l(
									`--tw-mask-${N}`,
									`linear-gradient(to ${N}, var(--tw-mask-${N}-from-color) var(--tw-mask-${N}-from-position), var(--tw-mask-${N}-to-color) var(--tw-mask-${N}-to-position))`,
								),
							),
							w.push(
								U([
									C(`--tw-mask-${N}-from-position`, "0%"),
									C(`--tw-mask-${N}-to-position`, "100%"),
									C(`--tw-mask-${N}-from-color`, "black"),
									C(`--tw-mask-${N}-to-color`, "transparent"),
								]),
							),
							w.push(l(`--tw-mask-${N}-${f}-color`, x)))
					return w
				},
				position(x) {
					const w = [
						y(),
						T(),
						l(
							"mask-image",
							"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
						),
						l("mask-composite", "intersect"),
						l(
							"--tw-mask-linear",
							"var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)",
						),
					]
					for (const N of ["top", "right", "bottom", "left"])
						p[N] &&
							(w.push(
								l(
									`--tw-mask-${N}`,
									`linear-gradient(to ${N}, var(--tw-mask-${N}-from-color) var(--tw-mask-${N}-from-position), var(--tw-mask-${N}-to-color) var(--tw-mask-${N}-to-position))`,
								),
							),
							w.push(
								U([
									C(`--tw-mask-${N}-from-position`, "0%"),
									C(`--tw-mask-${N}-to-position`, "100%"),
									C(`--tw-mask-${N}-from-color`, "black"),
									C(`--tw-mask-${N}-to-color`, "transparent"),
								]),
							),
							w.push(l(`--tw-mask-${N}-${f}-position`, x)))
					return w
				},
			})
		}
		E("mask-x-from", "from", { top: !1, right: !0, bottom: !1, left: !0 }),
			E("mask-x-to", "to", { top: !1, right: !0, bottom: !1, left: !0 }),
			E("mask-y-from", "from", { top: !0, right: !1, bottom: !0, left: !1 }),
			E("mask-y-to", "to", { top: !0, right: !1, bottom: !0, left: !1 }),
			E("mask-t-from", "from", { top: !0, right: !1, bottom: !1, left: !1 }),
			E("mask-t-to", "to", { top: !0, right: !1, bottom: !1, left: !1 }),
			E("mask-r-from", "from", { top: !1, right: !0, bottom: !1, left: !1 }),
			E("mask-r-to", "to", { top: !1, right: !0, bottom: !1, left: !1 }),
			E("mask-b-from", "from", { top: !1, right: !1, bottom: !0, left: !1 }),
			E("mask-b-to", "to", { top: !1, right: !1, bottom: !0, left: !1 }),
			E("mask-l-from", "from", { top: !1, right: !1, bottom: !1, left: !0 }),
			E("mask-l-to", "to", { top: !1, right: !1, bottom: !1, left: !0 })
		const P = () =>
			U([
				C("--tw-mask-linear-position", "0deg"),
				C("--tw-mask-linear-from-position", "0%"),
				C("--tw-mask-linear-to-position", "100%"),
				C("--tw-mask-linear-from-color", "black"),
				C("--tw-mask-linear-to-color", "transparent"),
			])
		i("mask-linear", {
			defaultValue: null,
			supportsNegative: !0,
			supportsFractions: !1,
			handleBareValue(n) {
				return V(n.value) ? `calc(1deg * ${n.value})` : null
			},
			handleNegativeBareValue(n) {
				return V(n.value) ? `calc(1deg * -${n.value})` : null
			},
			handle: (n) => [
				y(),
				P(),
				l(
					"mask-image",
					"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
				),
				l("mask-composite", "intersect"),
				l(
					"--tw-mask-linear",
					"linear-gradient(var(--tw-mask-linear-stops, var(--tw-mask-linear-position)))",
				),
				l("--tw-mask-linear-position", n),
			],
		}),
			o("mask-linear", () => [
				{
					supportsNegative: !0,
					values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
				},
			]),
			b("mask-linear-from", {
				color: (n) => [
					y(),
					P(),
					l(
						"mask-image",
						"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
					),
					l("mask-composite", "intersect"),
					l(
						"--tw-mask-linear-stops",
						"var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)",
					),
					l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"),
					l("--tw-mask-linear-from-color", n),
				],
				position: (n) => [
					y(),
					P(),
					l(
						"mask-image",
						"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
					),
					l("mask-composite", "intersect"),
					l(
						"--tw-mask-linear-stops",
						"var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)",
					),
					l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"),
					l("--tw-mask-linear-from-position", n),
				],
			}),
			b("mask-linear-to", {
				color: (n) => [
					y(),
					P(),
					l(
						"mask-image",
						"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
					),
					l("mask-composite", "intersect"),
					l(
						"--tw-mask-linear-stops",
						"var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)",
					),
					l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"),
					l("--tw-mask-linear-to-color", n),
				],
				position: (n) => [
					y(),
					P(),
					l(
						"mask-image",
						"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
					),
					l("mask-composite", "intersect"),
					l(
						"--tw-mask-linear-stops",
						"var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)",
					),
					l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"),
					l("--tw-mask-linear-to-position", n),
				],
			})
		const _ = () =>
			U([
				C("--tw-mask-radial-from-position", "0%"),
				C("--tw-mask-radial-to-position", "100%"),
				C("--tw-mask-radial-from-color", "black"),
				C("--tw-mask-radial-to-color", "transparent"),
				C("--tw-mask-radial-shape", "ellipse"),
				C("--tw-mask-radial-size", "farthest-corner"),
				C("--tw-mask-radial-position", "center"),
			])
		e("mask-circle", [["--tw-mask-radial-shape", "circle"]]),
			e("mask-ellipse", [["--tw-mask-radial-shape", "ellipse"]]),
			e("mask-radial-closest-side", [
				["--tw-mask-radial-size", "closest-side"],
			]),
			e("mask-radial-farthest-side", [
				["--tw-mask-radial-size", "farthest-side"],
			]),
			e("mask-radial-closest-corner", [
				["--tw-mask-radial-size", "closest-corner"],
			]),
			e("mask-radial-farthest-corner", [
				["--tw-mask-radial-size", "farthest-corner"],
			]),
			e("mask-radial-at-top", [["--tw-mask-radial-position", "top"]]),
			e("mask-radial-at-top-left", [["--tw-mask-radial-position", "top left"]]),
			e("mask-radial-at-top-right", [
				["--tw-mask-radial-position", "top right"],
			]),
			e("mask-radial-at-bottom", [["--tw-mask-radial-position", "bottom"]]),
			e("mask-radial-at-bottom-left", [
				["--tw-mask-radial-position", "bottom left"],
			]),
			e("mask-radial-at-bottom-right", [
				["--tw-mask-radial-position", "bottom right"],
			]),
			e("mask-radial-at-left", [["--tw-mask-radial-position", "left"]]),
			e("mask-radial-at-right", [["--tw-mask-radial-position", "right"]]),
			e("mask-radial-at-center", [["--tw-mask-radial-position", "center"]]),
			i("mask-radial-at", {
				defaultValue: null,
				supportsNegative: !1,
				supportsFractions: !1,
				handle: (n) => [l("--tw-mask-radial-position", n)],
			}),
			i("mask-radial", {
				defaultValue: null,
				supportsNegative: !1,
				supportsFractions: !1,
				handle: (n) => [
					y(),
					_(),
					l(
						"mask-image",
						"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
					),
					l("mask-composite", "intersect"),
					l(
						"--tw-mask-radial",
						"radial-gradient(var(--tw-mask-radial-stops, var(--tw-mask-radial-size)))",
					),
					l("--tw-mask-radial-size", n),
				],
			}),
			b("mask-radial-from", {
				color: (n) => [
					y(),
					_(),
					l(
						"mask-image",
						"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
					),
					l("mask-composite", "intersect"),
					l(
						"--tw-mask-radial-stops",
						"var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)",
					),
					l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"),
					l("--tw-mask-radial-from-color", n),
				],
				position: (n) => [
					y(),
					_(),
					l(
						"mask-image",
						"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
					),
					l("mask-composite", "intersect"),
					l(
						"--tw-mask-radial-stops",
						"var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)",
					),
					l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"),
					l("--tw-mask-radial-from-position", n),
				],
			}),
			b("mask-radial-to", {
				color: (n) => [
					y(),
					_(),
					l(
						"mask-image",
						"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
					),
					l("mask-composite", "intersect"),
					l(
						"--tw-mask-radial-stops",
						"var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)",
					),
					l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"),
					l("--tw-mask-radial-to-color", n),
				],
				position: (n) => [
					y(),
					_(),
					l(
						"mask-image",
						"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
					),
					l("mask-composite", "intersect"),
					l(
						"--tw-mask-radial-stops",
						"var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)",
					),
					l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"),
					l("--tw-mask-radial-to-position", n),
				],
			})
		const L = () =>
			U([
				C("--tw-mask-conic-position", "0deg"),
				C("--tw-mask-conic-from-position", "0%"),
				C("--tw-mask-conic-to-position", "100%"),
				C("--tw-mask-conic-from-color", "black"),
				C("--tw-mask-conic-to-color", "transparent"),
			])
		i("mask-conic", {
			defaultValue: null,
			supportsNegative: !0,
			supportsFractions: !1,
			handleBareValue(n) {
				return V(n.value) ? `calc(1deg * ${n.value})` : null
			},
			handleNegativeBareValue(n) {
				return V(n.value) ? `calc(1deg * -${n.value})` : null
			},
			handle: (n) => [
				y(),
				L(),
				l(
					"mask-image",
					"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
				),
				l("mask-composite", "intersect"),
				l(
					"--tw-mask-conic",
					"conic-gradient(var(--tw-mask-conic-stops, var(--tw-mask-conic-position)))",
				),
				l("--tw-mask-conic-position", n),
			],
		}),
			o("mask-conic", () => [
				{
					supportsNegative: !0,
					values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
				},
			]),
			b("mask-conic-from", {
				color: (n) => [
					y(),
					L(),
					l(
						"mask-image",
						"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
					),
					l("mask-composite", "intersect"),
					l(
						"--tw-mask-conic-stops",
						"from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)",
					),
					l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"),
					l("--tw-mask-conic-from-color", n),
				],
				position: (n) => [
					y(),
					L(),
					l(
						"mask-image",
						"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
					),
					l("mask-composite", "intersect"),
					l(
						"--tw-mask-conic-stops",
						"from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)",
					),
					l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"),
					l("--tw-mask-conic-from-position", n),
				],
			}),
			b("mask-conic-to", {
				color: (n) => [
					y(),
					L(),
					l(
						"mask-image",
						"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
					),
					l("mask-composite", "intersect"),
					l(
						"--tw-mask-conic-stops",
						"from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)",
					),
					l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"),
					l("--tw-mask-conic-to-color", n),
				],
				position: (n) => [
					y(),
					L(),
					l(
						"mask-image",
						"var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
					),
					l("mask-composite", "intersect"),
					l(
						"--tw-mask-conic-stops",
						"from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)",
					),
					l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"),
					l("--tw-mask-conic-to-position", n),
				],
			}),
			e("box-decoration-slice", [
				["-webkit-box-decoration-break", "slice"],
				["box-decoration-break", "slice"],
			]),
			e("box-decoration-clone", [
				["-webkit-box-decoration-break", "clone"],
				["box-decoration-break", "clone"],
			]),
			e("bg-clip-text", [["background-clip", "text"]]),
			e("bg-clip-border", [["background-clip", "border-box"]]),
			e("bg-clip-padding", [["background-clip", "padding-box"]]),
			e("bg-clip-content", [["background-clip", "content-box"]]),
			e("bg-origin-border", [["background-origin", "border-box"]]),
			e("bg-origin-padding", [["background-origin", "padding-box"]]),
			e("bg-origin-content", [["background-origin", "content-box"]])
		for (const n of [
			"normal",
			"multiply",
			"screen",
			"overlay",
			"darken",
			"lighten",
			"color-dodge",
			"color-burn",
			"hard-light",
			"soft-light",
			"difference",
			"exclusion",
			"hue",
			"saturation",
			"color",
			"luminosity",
		])
			e(`bg-blend-${n}`, [["background-blend-mode", n]]),
				e(`mix-blend-${n}`, [["mix-blend-mode", n]])
		e("mix-blend-plus-darker", [["mix-blend-mode", "plus-darker"]]),
			e("mix-blend-plus-lighter", [["mix-blend-mode", "plus-lighter"]]),
			e("fill-none", [["fill", "none"]]),
			r.functional("fill", (n) => {
				if (!n.value) return
				if (n.value.kind === "arbitrary") {
					const p = Q(n.value.value, n.modifier, t)
					return p === null ? void 0 : [l("fill", p)]
				}
				const f = Z(n, t, ["--fill", "--color"])
				if (f) return [l("fill", f)]
			}),
			o("fill", () => [
				{
					values: ["current", "inherit", "transparent"],
					valueThemeKeys: ["--fill", "--color"],
					modifiers: Array.from({ length: 21 }, (n, f) => `${f * 5}`),
				},
			]),
			e("stroke-none", [["stroke", "none"]]),
			r.functional("stroke", (n) => {
				if (n.value) {
					if (n.value.kind === "arbitrary") {
						let f = n.value.value
						switch (
							n.value.dataType ??
							B(f, ["color", "number", "length", "percentage"])
						) {
							case "number":
							case "length":
							case "percentage":
								return n.modifier ? void 0 : [l("stroke-width", f)]
							default:
								return (
									(f = Q(n.value.value, n.modifier, t)),
									f === null ? void 0 : [l("stroke", f)]
								)
						}
					}
					{
						const f = Z(n, t, ["--stroke", "--color"])
						if (f) return [l("stroke", f)]
					}
					{
						const f = t.resolve(n.value.value, ["--stroke-width"])
						if (f) return [l("stroke-width", f)]
						if (V(n.value.value)) return [l("stroke-width", n.value.value)]
					}
				}
			}),
			o("stroke", () => [
				{
					values: ["current", "inherit", "transparent"],
					valueThemeKeys: ["--stroke", "--color"],
					modifiers: Array.from({ length: 21 }, (n, f) => `${f * 5}`),
				},
				{ values: ["0", "1", "2", "3"], valueThemeKeys: ["--stroke-width"] },
			]),
			e("object-contain", [["object-fit", "contain"]]),
			e("object-cover", [["object-fit", "cover"]]),
			e("object-fill", [["object-fit", "fill"]]),
			e("object-none", [["object-fit", "none"]]),
			e("object-scale-down", [["object-fit", "scale-down"]]),
			e("object-top", [["object-position", "top"]]),
			e("object-top-left", [["object-position", "left top"]]),
			e("object-top-right", [["object-position", "right top"]]),
			e("object-bottom", [["object-position", "bottom"]]),
			e("object-bottom-left", [["object-position", "left bottom"]]),
			e("object-bottom-right", [["object-position", "right bottom"]]),
			e("object-left", [["object-position", "left"]]),
			e("object-right", [["object-position", "right"]]),
			e("object-center", [["object-position", "center"]]),
			i("object", {
				themeKeys: ["--object-position"],
				handle: (n) => [l("object-position", n)],
			})
		for (const [n, f] of [
			["p", "padding"],
			["px", "padding-inline"],
			["py", "padding-block"],
			["ps", "padding-inline-start"],
			["pe", "padding-inline-end"],
			["pt", "padding-top"],
			["pr", "padding-right"],
			["pb", "padding-bottom"],
			["pl", "padding-left"],
		])
			a(n, ["--padding", "--spacing"], (p) => [l(f, p)])
		e("text-left", [["text-align", "left"]]),
			e("text-center", [["text-align", "center"]]),
			e("text-right", [["text-align", "right"]]),
			e("text-justify", [["text-align", "justify"]]),
			e("text-start", [["text-align", "start"]]),
			e("text-end", [["text-align", "end"]]),
			a(
				"indent",
				["--text-indent", "--spacing"],
				(n) => [l("text-indent", n)],
				{ supportsNegative: !0 },
			),
			e("align-baseline", [["vertical-align", "baseline"]]),
			e("align-top", [["vertical-align", "top"]]),
			e("align-middle", [["vertical-align", "middle"]]),
			e("align-bottom", [["vertical-align", "bottom"]]),
			e("align-text-top", [["vertical-align", "text-top"]]),
			e("align-text-bottom", [["vertical-align", "text-bottom"]]),
			e("align-sub", [["vertical-align", "sub"]]),
			e("align-super", [["vertical-align", "super"]]),
			i("align", { themeKeys: [], handle: (n) => [l("vertical-align", n)] }),
			r.functional("font", (n) => {
				if (!(!n.value || n.modifier)) {
					if (n.value.kind === "arbitrary") {
						const f = n.value.value
						switch (
							n.value.dataType ??
							B(f, ["number", "generic-name", "family-name"])
						) {
							case "generic-name":
							case "family-name":
								return [l("font-family", f)]
							default:
								return [
									U([C("--tw-font-weight")]),
									l("--tw-font-weight", f),
									l("font-weight", f),
								]
						}
					}
					{
						const f = t.resolveWith(
							n.value.value,
							["--font"],
							["--font-feature-settings", "--font-variation-settings"],
						)
						if (f) {
							const [p, x = {}] = f
							return [
								l("font-family", p),
								l("font-feature-settings", x["--font-feature-settings"]),
								l("font-variation-settings", x["--font-variation-settings"]),
							]
						}
					}
					{
						const f = t.resolve(n.value.value, ["--font-weight"])
						if (f)
							return [
								U([C("--tw-font-weight")]),
								l("--tw-font-weight", f),
								l("font-weight", f),
							]
					}
				}
			}),
			o("font", () => [
				{ values: [], valueThemeKeys: ["--font"] },
				{ values: [], valueThemeKeys: ["--font-weight"] },
			]),
			e("uppercase", [["text-transform", "uppercase"]]),
			e("lowercase", [["text-transform", "lowercase"]]),
			e("capitalize", [["text-transform", "capitalize"]]),
			e("normal-case", [["text-transform", "none"]]),
			e("italic", [["font-style", "italic"]]),
			e("not-italic", [["font-style", "normal"]]),
			e("underline", [["text-decoration-line", "underline"]]),
			e("overline", [["text-decoration-line", "overline"]]),
			e("line-through", [["text-decoration-line", "line-through"]]),
			e("no-underline", [["text-decoration-line", "none"]]),
			e("font-stretch-normal", [["font-stretch", "normal"]]),
			e("font-stretch-ultra-condensed", [["font-stretch", "ultra-condensed"]]),
			e("font-stretch-extra-condensed", [["font-stretch", "extra-condensed"]]),
			e("font-stretch-condensed", [["font-stretch", "condensed"]]),
			e("font-stretch-semi-condensed", [["font-stretch", "semi-condensed"]]),
			e("font-stretch-semi-expanded", [["font-stretch", "semi-expanded"]]),
			e("font-stretch-expanded", [["font-stretch", "expanded"]]),
			e("font-stretch-extra-expanded", [["font-stretch", "extra-expanded"]]),
			e("font-stretch-ultra-expanded", [["font-stretch", "ultra-expanded"]]),
			i("font-stretch", {
				handleBareValue: ({ value: n }) => {
					if (!n.endsWith("%")) return null
					const f = Number(n.slice(0, -1))
					return !V(f) || Number.isNaN(f) || f < 50 || f > 200 ? null : n
				},
				handle: (n) => [l("font-stretch", n)],
			}),
			o("font-stretch", () => [
				{
					values: [
						"50%",
						"75%",
						"90%",
						"95%",
						"100%",
						"105%",
						"110%",
						"125%",
						"150%",
						"200%",
					],
				},
			]),
			s("placeholder", {
				themeKeys: ["--background-color", "--color"],
				handle: (n) => [
					I("&::placeholder", [
						l("--tw-sort", "placeholder-color"),
						l("color", n),
					]),
				],
			}),
			e("decoration-solid", [["text-decoration-style", "solid"]]),
			e("decoration-double", [["text-decoration-style", "double"]]),
			e("decoration-dotted", [["text-decoration-style", "dotted"]]),
			e("decoration-dashed", [["text-decoration-style", "dashed"]]),
			e("decoration-wavy", [["text-decoration-style", "wavy"]]),
			e("decoration-auto", [["text-decoration-thickness", "auto"]]),
			e("decoration-from-font", [["text-decoration-thickness", "from-font"]]),
			r.functional("decoration", (n) => {
				if (n.value) {
					if (n.value.kind === "arbitrary") {
						let f = n.value.value
						switch (
							n.value.dataType ??
							B(f, ["color", "length", "percentage"])
						) {
							case "length":
							case "percentage":
								return n.modifier ? void 0 : [l("text-decoration-thickness", f)]
							default:
								return (
									(f = Q(f, n.modifier, t)),
									f === null ? void 0 : [l("text-decoration-color", f)]
								)
						}
					}
					{
						const f = t.resolve(n.value.value, ["--text-decoration-thickness"])
						if (f)
							return n.modifier ? void 0 : [l("text-decoration-thickness", f)]
						if (V(n.value.value))
							return n.modifier
								? void 0
								: [l("text-decoration-thickness", `${n.value.value}px`)]
					}
					{
						const f = Z(n, t, ["--text-decoration-color", "--color"])
						if (f) return [l("text-decoration-color", f)]
					}
				}
			}),
			o("decoration", () => [
				{
					values: ["current", "inherit", "transparent"],
					valueThemeKeys: ["--text-decoration-color", "--color"],
					modifiers: Array.from({ length: 21 }, (n, f) => `${f * 5}`),
				},
				{
					values: ["0", "1", "2"],
					valueThemeKeys: ["--text-decoration-thickness"],
				},
			]),
			e("animate-none", [["animation", "none"]]),
			i("animate", {
				themeKeys: ["--animate"],
				handle: (n) => [l("animation", n)],
			})
		{
			const n = [
					"var(--tw-blur,)",
					"var(--tw-brightness,)",
					"var(--tw-contrast,)",
					"var(--tw-grayscale,)",
					"var(--tw-hue-rotate,)",
					"var(--tw-invert,)",
					"var(--tw-saturate,)",
					"var(--tw-sepia,)",
					"var(--tw-drop-shadow,)",
				].join(" "),
				f = [
					"var(--tw-backdrop-blur,)",
					"var(--tw-backdrop-brightness,)",
					"var(--tw-backdrop-contrast,)",
					"var(--tw-backdrop-grayscale,)",
					"var(--tw-backdrop-hue-rotate,)",
					"var(--tw-backdrop-invert,)",
					"var(--tw-backdrop-opacity,)",
					"var(--tw-backdrop-saturate,)",
					"var(--tw-backdrop-sepia,)",
				].join(" "),
				p = () =>
					U([
						C("--tw-blur"),
						C("--tw-brightness"),
						C("--tw-contrast"),
						C("--tw-grayscale"),
						C("--tw-hue-rotate"),
						C("--tw-invert"),
						C("--tw-opacity"),
						C("--tw-saturate"),
						C("--tw-sepia"),
						C("--tw-drop-shadow"),
						C("--tw-drop-shadow-color"),
						C("--tw-drop-shadow-alpha", "100%", "<percentage>"),
						C("--tw-drop-shadow-size"),
					]),
				x = () =>
					U([
						C("--tw-backdrop-blur"),
						C("--tw-backdrop-brightness"),
						C("--tw-backdrop-contrast"),
						C("--tw-backdrop-grayscale"),
						C("--tw-backdrop-hue-rotate"),
						C("--tw-backdrop-invert"),
						C("--tw-backdrop-opacity"),
						C("--tw-backdrop-saturate"),
						C("--tw-backdrop-sepia"),
					])
			r.functional("filter", (w) => {
				if (!w.modifier) {
					if (w.value === null) return [p(), l("filter", n)]
					if (w.value.kind === "arbitrary") return [l("filter", w.value.value)]
					switch (w.value.value) {
						case "none":
							return [l("filter", "none")]
					}
				}
			}),
				r.functional("backdrop-filter", (w) => {
					if (!w.modifier) {
						if (w.value === null)
							return [
								x(),
								l("-webkit-backdrop-filter", f),
								l("backdrop-filter", f),
							]
						if (w.value.kind === "arbitrary")
							return [
								l("-webkit-backdrop-filter", w.value.value),
								l("backdrop-filter", w.value.value),
							]
						switch (w.value.value) {
							case "none":
								return [
									l("-webkit-backdrop-filter", "none"),
									l("backdrop-filter", "none"),
								]
						}
					}
				}),
				i("blur", {
					themeKeys: ["--blur"],
					handle: (w) => [p(), l("--tw-blur", `blur(${w})`), l("filter", n)],
				}),
				e("blur-none", [p, ["--tw-blur", " "], ["filter", n]]),
				i("backdrop-blur", {
					themeKeys: ["--backdrop-blur", "--blur"],
					handle: (w) => [
						x(),
						l("--tw-backdrop-blur", `blur(${w})`),
						l("-webkit-backdrop-filter", f),
						l("backdrop-filter", f),
					],
				}),
				e("backdrop-blur-none", [
					x,
					["--tw-backdrop-blur", " "],
					["-webkit-backdrop-filter", f],
					["backdrop-filter", f],
				]),
				i("brightness", {
					themeKeys: ["--brightness"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}%` : null),
					handle: (w) => [
						p(),
						l("--tw-brightness", `brightness(${w})`),
						l("filter", n),
					],
				}),
				i("backdrop-brightness", {
					themeKeys: ["--backdrop-brightness", "--brightness"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}%` : null),
					handle: (w) => [
						x(),
						l("--tw-backdrop-brightness", `brightness(${w})`),
						l("-webkit-backdrop-filter", f),
						l("backdrop-filter", f),
					],
				}),
				o("brightness", () => [
					{
						values: [
							"0",
							"50",
							"75",
							"90",
							"95",
							"100",
							"105",
							"110",
							"125",
							"150",
							"200",
						],
						valueThemeKeys: ["--brightness"],
					},
				]),
				o("backdrop-brightness", () => [
					{
						values: [
							"0",
							"50",
							"75",
							"90",
							"95",
							"100",
							"105",
							"110",
							"125",
							"150",
							"200",
						],
						valueThemeKeys: ["--backdrop-brightness", "--brightness"],
					},
				]),
				i("contrast", {
					themeKeys: ["--contrast"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}%` : null),
					handle: (w) => [
						p(),
						l("--tw-contrast", `contrast(${w})`),
						l("filter", n),
					],
				}),
				i("backdrop-contrast", {
					themeKeys: ["--backdrop-contrast", "--contrast"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}%` : null),
					handle: (w) => [
						x(),
						l("--tw-backdrop-contrast", `contrast(${w})`),
						l("-webkit-backdrop-filter", f),
						l("backdrop-filter", f),
					],
				}),
				o("contrast", () => [
					{
						values: ["0", "50", "75", "100", "125", "150", "200"],
						valueThemeKeys: ["--contrast"],
					},
				]),
				o("backdrop-contrast", () => [
					{
						values: ["0", "50", "75", "100", "125", "150", "200"],
						valueThemeKeys: ["--backdrop-contrast", "--contrast"],
					},
				]),
				i("grayscale", {
					themeKeys: ["--grayscale"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}%` : null),
					defaultValue: "100%",
					handle: (w) => [
						p(),
						l("--tw-grayscale", `grayscale(${w})`),
						l("filter", n),
					],
				}),
				i("backdrop-grayscale", {
					themeKeys: ["--backdrop-grayscale", "--grayscale"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}%` : null),
					defaultValue: "100%",
					handle: (w) => [
						x(),
						l("--tw-backdrop-grayscale", `grayscale(${w})`),
						l("-webkit-backdrop-filter", f),
						l("backdrop-filter", f),
					],
				}),
				o("grayscale", () => [
					{
						values: ["0", "25", "50", "75", "100"],
						valueThemeKeys: ["--grayscale"],
						hasDefaultValue: !0,
					},
				]),
				o("backdrop-grayscale", () => [
					{
						values: ["0", "25", "50", "75", "100"],
						valueThemeKeys: ["--backdrop-grayscale", "--grayscale"],
						hasDefaultValue: !0,
					},
				]),
				i("hue-rotate", {
					supportsNegative: !0,
					themeKeys: ["--hue-rotate"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}deg` : null),
					handle: (w) => [
						p(),
						l("--tw-hue-rotate", `hue-rotate(${w})`),
						l("filter", n),
					],
				}),
				i("backdrop-hue-rotate", {
					supportsNegative: !0,
					themeKeys: ["--backdrop-hue-rotate", "--hue-rotate"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}deg` : null),
					handle: (w) => [
						x(),
						l("--tw-backdrop-hue-rotate", `hue-rotate(${w})`),
						l("-webkit-backdrop-filter", f),
						l("backdrop-filter", f),
					],
				}),
				o("hue-rotate", () => [
					{
						values: ["0", "15", "30", "60", "90", "180"],
						valueThemeKeys: ["--hue-rotate"],
					},
				]),
				o("backdrop-hue-rotate", () => [
					{
						values: ["0", "15", "30", "60", "90", "180"],
						valueThemeKeys: ["--backdrop-hue-rotate", "--hue-rotate"],
					},
				]),
				i("invert", {
					themeKeys: ["--invert"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}%` : null),
					defaultValue: "100%",
					handle: (w) => [
						p(),
						l("--tw-invert", `invert(${w})`),
						l("filter", n),
					],
				}),
				i("backdrop-invert", {
					themeKeys: ["--backdrop-invert", "--invert"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}%` : null),
					defaultValue: "100%",
					handle: (w) => [
						x(),
						l("--tw-backdrop-invert", `invert(${w})`),
						l("-webkit-backdrop-filter", f),
						l("backdrop-filter", f),
					],
				}),
				o("invert", () => [
					{
						values: ["0", "25", "50", "75", "100"],
						valueThemeKeys: ["--invert"],
						hasDefaultValue: !0,
					},
				]),
				o("backdrop-invert", () => [
					{
						values: ["0", "25", "50", "75", "100"],
						valueThemeKeys: ["--backdrop-invert", "--invert"],
						hasDefaultValue: !0,
					},
				]),
				i("saturate", {
					themeKeys: ["--saturate"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}%` : null),
					handle: (w) => [
						p(),
						l("--tw-saturate", `saturate(${w})`),
						l("filter", n),
					],
				}),
				i("backdrop-saturate", {
					themeKeys: ["--backdrop-saturate", "--saturate"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}%` : null),
					handle: (w) => [
						x(),
						l("--tw-backdrop-saturate", `saturate(${w})`),
						l("-webkit-backdrop-filter", f),
						l("backdrop-filter", f),
					],
				}),
				o("saturate", () => [
					{
						values: ["0", "50", "100", "150", "200"],
						valueThemeKeys: ["--saturate"],
					},
				]),
				o("backdrop-saturate", () => [
					{
						values: ["0", "50", "100", "150", "200"],
						valueThemeKeys: ["--backdrop-saturate", "--saturate"],
					},
				]),
				i("sepia", {
					themeKeys: ["--sepia"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}%` : null),
					defaultValue: "100%",
					handle: (w) => [p(), l("--tw-sepia", `sepia(${w})`), l("filter", n)],
				}),
				i("backdrop-sepia", {
					themeKeys: ["--backdrop-sepia", "--sepia"],
					handleBareValue: ({ value: w }) => (V(w) ? `${w}%` : null),
					defaultValue: "100%",
					handle: (w) => [
						x(),
						l("--tw-backdrop-sepia", `sepia(${w})`),
						l("-webkit-backdrop-filter", f),
						l("backdrop-filter", f),
					],
				}),
				o("sepia", () => [
					{
						values: ["0", "50", "100"],
						valueThemeKeys: ["--sepia"],
						hasDefaultValue: !0,
					},
				]),
				o("backdrop-sepia", () => [
					{
						values: ["0", "50", "100"],
						valueThemeKeys: ["--backdrop-sepia", "--sepia"],
						hasDefaultValue: !0,
					},
				]),
				e("drop-shadow-none", [p, ["--tw-drop-shadow", " "], ["filter", n]]),
				r.functional("drop-shadow", (w) => {
					let N
					if (
						(w.modifier &&
							(w.modifier.kind === "arbitrary"
								? (N = w.modifier.value)
								: V(w.modifier.value) && (N = `${w.modifier.value}%`)),
						!w.value)
					) {
						const O = t.get(["--drop-shadow"]),
							$ = t.resolve(null, ["--drop-shadow"])
						return O === null || $ === null
							? void 0
							: [
									p(),
									l("--tw-drop-shadow-alpha", N),
									...tt(
										"--tw-drop-shadow-size",
										O,
										N,
										(S) => `var(--tw-drop-shadow-color, ${S})`,
									),
									l(
										"--tw-drop-shadow",
										K($, ",")
											.map((S) => `drop-shadow(${S})`)
											.join(" "),
									),
									l("filter", n),
								]
					}
					if (w.value.kind === "arbitrary") {
						let O = w.value.value
						switch (w.value.dataType ?? B(O, ["color"])) {
							case "color":
								return (
									(O = Q(O, w.modifier, t)),
									O === null
										? void 0
										: [
												p(),
												l(
													"--tw-drop-shadow-color",
													Y(O, "var(--tw-drop-shadow-alpha)"),
												),
												l("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
											]
								)
							default:
								return w.modifier && !N
									? void 0
									: [
											p(),
											l("--tw-drop-shadow-alpha", N),
											...tt(
												"--tw-drop-shadow-size",
												O,
												N,
												(S) => `var(--tw-drop-shadow-color, ${S})`,
											),
											l("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
											l("filter", n),
										]
						}
					}
					{
						const O = t.get([`--drop-shadow-${w.value.value}`]),
							$ = t.resolve(w.value.value, ["--drop-shadow"])
						if (O && $)
							return w.modifier && !N
								? void 0
								: N
									? [
											p(),
											l("--tw-drop-shadow-alpha", N),
											...tt(
												"--tw-drop-shadow-size",
												O,
												N,
												(S) => `var(--tw-drop-shadow-color, ${S})`,
											),
											l("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
											l("filter", n),
										]
									: [
											p(),
											l("--tw-drop-shadow-alpha", N),
											...tt(
												"--tw-drop-shadow-size",
												O,
												N,
												(S) => `var(--tw-drop-shadow-color, ${S})`,
											),
											l(
												"--tw-drop-shadow",
												K($, ",")
													.map((S) => `drop-shadow(${S})`)
													.join(" "),
											),
											l("filter", n),
										]
					}
					{
						const O = Z(w, t, ["--drop-shadow-color", "--color"])
						if (O)
							return [
								p(),
								l(
									"--tw-drop-shadow-color",
									Y(O, "var(--tw-drop-shadow-alpha)"),
								),
								l("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
							]
					}
				}),
				o("drop-shadow", () => [
					{
						values: ["current", "inherit", "transparent"],
						valueThemeKeys: ["--drop-shadow-color", "--color"],
						modifiers: Array.from({ length: 21 }, (w, N) => `${N * 5}`),
					},
					{ valueThemeKeys: ["--drop-shadow"] },
				]),
				i("backdrop-opacity", {
					themeKeys: ["--backdrop-opacity", "--opacity"],
					handleBareValue: ({ value: w }) => (et(w) ? `${w}%` : null),
					handle: (w) => [
						x(),
						l("--tw-backdrop-opacity", `opacity(${w})`),
						l("-webkit-backdrop-filter", f),
						l("backdrop-filter", f),
					],
				}),
				o("backdrop-opacity", () => [
					{
						values: Array.from({ length: 21 }, (w, N) => `${N * 5}`),
						valueThemeKeys: ["--backdrop-opacity", "--opacity"],
					},
				])
		}
		{
			const n = `var(--tw-ease, ${t.resolve(null, ["--default-transition-timing-function"]) ?? "ease"})`,
				f = `var(--tw-duration, ${t.resolve(null, ["--default-transition-duration"]) ?? "0s"})`
			e("transition-none", [["transition-property", "none"]]),
				e("transition-all", [
					["transition-property", "all"],
					["transition-timing-function", n],
					["transition-duration", f],
				]),
				e("transition-colors", [
					[
						"transition-property",
						"color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
					],
					["transition-timing-function", n],
					["transition-duration", f],
				]),
				e("transition-opacity", [
					["transition-property", "opacity"],
					["transition-timing-function", n],
					["transition-duration", f],
				]),
				e("transition-shadow", [
					["transition-property", "box-shadow"],
					["transition-timing-function", n],
					["transition-duration", f],
				]),
				e("transition-transform", [
					["transition-property", "transform, translate, scale, rotate"],
					["transition-timing-function", n],
					["transition-duration", f],
				]),
				i("transition", {
					defaultValue:
						"color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter",
					themeKeys: ["--transition-property"],
					handle: (p) => [
						l("transition-property", p),
						l("transition-timing-function", n),
						l("transition-duration", f),
					],
				}),
				e("transition-discrete", [["transition-behavior", "allow-discrete"]]),
				e("transition-normal", [["transition-behavior", "normal"]]),
				i("delay", {
					handleBareValue: ({ value: p }) => (V(p) ? `${p}ms` : null),
					themeKeys: ["--transition-delay"],
					handle: (p) => [l("transition-delay", p)],
				})
			{
				const p = () => U([C("--tw-duration")])
				e("duration-initial", [p, ["--tw-duration", "initial"]]),
					r.functional("duration", (x) => {
						if (x.modifier || !x.value) return
						let w = null
						if (
							(x.value.kind === "arbitrary"
								? (w = x.value.value)
								: ((w = t.resolve(x.value.fraction ?? x.value.value, [
										"--transition-duration",
									])),
									w === null && V(x.value.value) && (w = `${x.value.value}ms`)),
							w !== null)
						)
							return [p(), l("--tw-duration", w), l("transition-duration", w)]
					})
			}
			o("delay", () => [
				{
					values: ["75", "100", "150", "200", "300", "500", "700", "1000"],
					valueThemeKeys: ["--transition-delay"],
				},
			]),
				o("duration", () => [
					{
						values: ["75", "100", "150", "200", "300", "500", "700", "1000"],
						valueThemeKeys: ["--transition-duration"],
					},
				])
		}
		{
			const n = () => U([C("--tw-ease")])
			e("ease-initial", [n, ["--tw-ease", "initial"]]),
				e("ease-linear", [
					n,
					["--tw-ease", "linear"],
					["transition-timing-function", "linear"],
				]),
				i("ease", {
					themeKeys: ["--ease"],
					handle: (f) => [
						n(),
						l("--tw-ease", f),
						l("transition-timing-function", f),
					],
				})
		}
		e("will-change-auto", [["will-change", "auto"]]),
			e("will-change-scroll", [["will-change", "scroll-position"]]),
			e("will-change-contents", [["will-change", "contents"]]),
			e("will-change-transform", [["will-change", "transform"]]),
			i("will-change", { themeKeys: [], handle: (n) => [l("will-change", n)] }),
			e("content-none", [
				["--tw-content", "none"],
				["content", "none"],
			]),
			i("content", {
				themeKeys: [],
				handle: (n) => [
					U([C("--tw-content", '""')]),
					l("--tw-content", n),
					l("content", "var(--tw-content)"),
				],
			})
		{
			const n =
					"var(--tw-contain-size,) var(--tw-contain-layout,) var(--tw-contain-paint,) var(--tw-contain-style,)",
				f = () =>
					U([
						C("--tw-contain-size"),
						C("--tw-contain-layout"),
						C("--tw-contain-paint"),
						C("--tw-contain-style"),
					])
			e("contain-none", [["contain", "none"]]),
				e("contain-content", [["contain", "content"]]),
				e("contain-strict", [["contain", "strict"]]),
				e("contain-size", [f, ["--tw-contain-size", "size"], ["contain", n]]),
				e("contain-inline-size", [
					f,
					["--tw-contain-size", "inline-size"],
					["contain", n],
				]),
				e("contain-layout", [
					f,
					["--tw-contain-layout", "layout"],
					["contain", n],
				]),
				e("contain-paint", [
					f,
					["--tw-contain-paint", "paint"],
					["contain", n],
				]),
				e("contain-style", [
					f,
					["--tw-contain-style", "style"],
					["contain", n],
				]),
				i("contain", { themeKeys: [], handle: (p) => [l("contain", p)] })
		}
		e("forced-color-adjust-none", [["forced-color-adjust", "none"]]),
			e("forced-color-adjust-auto", [["forced-color-adjust", "auto"]]),
			e("leading-none", [
				() => U([C("--tw-leading")]),
				["--tw-leading", "1"],
				["line-height", "1"],
			]),
			a("leading", ["--leading", "--spacing"], (n) => [
				U([C("--tw-leading")]),
				l("--tw-leading", n),
				l("line-height", n),
			]),
			i("tracking", {
				supportsNegative: !0,
				themeKeys: ["--tracking"],
				handle: (n) => [
					U([C("--tw-tracking")]),
					l("--tw-tracking", n),
					l("letter-spacing", n),
				],
			}),
			e("antialiased", [
				["-webkit-font-smoothing", "antialiased"],
				["-moz-osx-font-smoothing", "grayscale"],
			]),
			e("subpixel-antialiased", [
				["-webkit-font-smoothing", "auto"],
				["-moz-osx-font-smoothing", "auto"],
			])
		{
			const n =
					"var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)",
				f = () =>
					U([
						C("--tw-ordinal"),
						C("--tw-slashed-zero"),
						C("--tw-numeric-figure"),
						C("--tw-numeric-spacing"),
						C("--tw-numeric-fraction"),
					])
			e("normal-nums", [["font-variant-numeric", "normal"]]),
				e("ordinal", [
					f,
					["--tw-ordinal", "ordinal"],
					["font-variant-numeric", n],
				]),
				e("slashed-zero", [
					f,
					["--tw-slashed-zero", "slashed-zero"],
					["font-variant-numeric", n],
				]),
				e("lining-nums", [
					f,
					["--tw-numeric-figure", "lining-nums"],
					["font-variant-numeric", n],
				]),
				e("oldstyle-nums", [
					f,
					["--tw-numeric-figure", "oldstyle-nums"],
					["font-variant-numeric", n],
				]),
				e("proportional-nums", [
					f,
					["--tw-numeric-spacing", "proportional-nums"],
					["font-variant-numeric", n],
				]),
				e("tabular-nums", [
					f,
					["--tw-numeric-spacing", "tabular-nums"],
					["font-variant-numeric", n],
				]),
				e("diagonal-fractions", [
					f,
					["--tw-numeric-fraction", "diagonal-fractions"],
					["font-variant-numeric", n],
				]),
				e("stacked-fractions", [
					f,
					["--tw-numeric-fraction", "stacked-fractions"],
					["font-variant-numeric", n],
				])
		}
		{
			const n = () => U([C("--tw-outline-style", "solid")])
			r.static("outline-hidden", () => [
				l("--tw-outline-style", "none"),
				l("outline-style", "none"),
				D("@media", "(forced-colors: active)", [
					l("outline", "2px solid transparent"),
					l("outline-offset", "2px"),
				]),
			]),
				e("outline-none", [
					["--tw-outline-style", "none"],
					["outline-style", "none"],
				]),
				e("outline-solid", [
					["--tw-outline-style", "solid"],
					["outline-style", "solid"],
				]),
				e("outline-dashed", [
					["--tw-outline-style", "dashed"],
					["outline-style", "dashed"],
				]),
				e("outline-dotted", [
					["--tw-outline-style", "dotted"],
					["outline-style", "dotted"],
				]),
				e("outline-double", [
					["--tw-outline-style", "double"],
					["outline-style", "double"],
				]),
				r.functional("outline", (f) => {
					if (f.value === null) {
						if (f.modifier) return
						const p = t.get(["--default-outline-width"]) ?? "1px"
						return [
							n(),
							l("outline-style", "var(--tw-outline-style)"),
							l("outline-width", p),
						]
					}
					if (f.value.kind === "arbitrary") {
						let p = f.value.value
						switch (
							f.value.dataType ??
							B(p, ["color", "length", "number", "percentage"])
						) {
							case "length":
							case "number":
							case "percentage":
								return f.modifier
									? void 0
									: [
											n(),
											l("outline-style", "var(--tw-outline-style)"),
											l("outline-width", p),
										]
							default:
								return (
									(p = Q(p, f.modifier, t)),
									p === null ? void 0 : [l("outline-color", p)]
								)
						}
					}
					{
						const p = Z(f, t, ["--outline-color", "--color"])
						if (p) return [l("outline-color", p)]
					}
					{
						if (f.modifier) return
						const p = t.resolve(f.value.value, ["--outline-width"])
						if (p)
							return [
								n(),
								l("outline-style", "var(--tw-outline-style)"),
								l("outline-width", p),
							]
						if (V(f.value.value))
							return [
								n(),
								l("outline-style", "var(--tw-outline-style)"),
								l("outline-width", `${f.value.value}px`),
							]
					}
				}),
				o("outline", () => [
					{
						values: ["current", "inherit", "transparent"],
						valueThemeKeys: ["--outline-color", "--color"],
						modifiers: Array.from({ length: 21 }, (f, p) => `${p * 5}`),
						hasDefaultValue: !0,
					},
					{
						values: ["0", "1", "2", "4", "8"],
						valueThemeKeys: ["--outline-width"],
					},
				]),
				i("outline-offset", {
					supportsNegative: !0,
					themeKeys: ["--outline-offset"],
					handleBareValue: ({ value: f }) => (V(f) ? `${f}px` : null),
					handle: (f) => [l("outline-offset", f)],
				}),
				o("outline-offset", () => [
					{
						supportsNegative: !0,
						values: ["0", "1", "2", "4", "8"],
						valueThemeKeys: ["--outline-offset"],
					},
				])
		}
		i("opacity", {
			themeKeys: ["--opacity"],
			handleBareValue: ({ value: n }) => (et(n) ? `${n}%` : null),
			handle: (n) => [l("opacity", n)],
		}),
			o("opacity", () => [
				{
					values: Array.from({ length: 21 }, (n, f) => `${f * 5}`),
					valueThemeKeys: ["--opacity"],
				},
			]),
			e("underline-offset-auto", [["text-underline-offset", "auto"]]),
			i("underline-offset", {
				supportsNegative: !0,
				themeKeys: ["--text-underline-offset"],
				handleBareValue: ({ value: n }) => (V(n) ? `${n}px` : null),
				handle: (n) => [l("text-underline-offset", n)],
			}),
			o("underline-offset", () => [
				{
					supportsNegative: !0,
					values: ["0", "1", "2", "4", "8"],
					valueThemeKeys: ["--text-underline-offset"],
				},
			]),
			r.functional("text", (n) => {
				if (n.value) {
					if (n.value.kind === "arbitrary") {
						let f = n.value.value
						switch (
							n.value.dataType ??
							B(f, [
								"color",
								"length",
								"percentage",
								"absolute-size",
								"relative-size",
							])
						) {
							case "size":
							case "length":
							case "percentage":
							case "absolute-size":
							case "relative-size": {
								if (n.modifier) {
									let x =
										n.modifier.kind === "arbitrary"
											? n.modifier.value
											: t.resolve(n.modifier.value, ["--leading"])
									if (!x && we(n.modifier.value)) {
										const w = t.resolve(null, ["--spacing"])
										if (!w) return null
										x = `calc(${w} * ${n.modifier.value})`
									}
									return (
										!x && n.modifier.value === "none" && (x = "1"),
										x ? [l("font-size", f), l("line-height", x)] : null
									)
								}
								return [l("font-size", f)]
							}
							default:
								return (
									(f = Q(f, n.modifier, t)),
									f === null ? void 0 : [l("color", f)]
								)
						}
					}
					{
						const f = Z(n, t, ["--text-color", "--color"])
						if (f) return [l("color", f)]
					}
					{
						const f = t.resolveWith(
							n.value.value,
							["--text"],
							["--line-height", "--letter-spacing", "--font-weight"],
						)
						if (f) {
							const [p, x = {}] = Array.isArray(f) ? f : [f]
							if (n.modifier) {
								let w =
									n.modifier.kind === "arbitrary"
										? n.modifier.value
										: t.resolve(n.modifier.value, ["--leading"])
								if (!w && we(n.modifier.value)) {
									const O = t.resolve(null, ["--spacing"])
									if (!O) return null
									w = `calc(${O} * ${n.modifier.value})`
								}
								if ((!w && n.modifier.value === "none" && (w = "1"), !w))
									return null
								const N = [l("font-size", p)]
								return w && N.push(l("line-height", w)), N
							}
							return typeof x == "string"
								? [l("font-size", p), l("line-height", x)]
								: [
										l("font-size", p),
										l(
											"line-height",
											x["--line-height"]
												? `var(--tw-leading, ${x["--line-height"]})`
												: void 0,
										),
										l(
											"letter-spacing",
											x["--letter-spacing"]
												? `var(--tw-tracking, ${x["--letter-spacing"]})`
												: void 0,
										),
										l(
											"font-weight",
											x["--font-weight"]
												? `var(--tw-font-weight, ${x["--font-weight"]})`
												: void 0,
										),
									]
						}
					}
				}
			}),
			o("text", () => [
				{
					values: ["current", "inherit", "transparent"],
					valueThemeKeys: ["--text-color", "--color"],
					modifiers: Array.from({ length: 21 }, (n, f) => `${f * 5}`),
				},
				{
					values: [],
					valueThemeKeys: ["--text"],
					modifiers: [],
					modifierThemeKeys: ["--leading"],
				},
			])
		const R = () =>
			U([
				C("--tw-text-shadow-color"),
				C("--tw-text-shadow-alpha", "100%", "<percentage>"),
			])
		e("text-shadow-initial", [R, ["--tw-text-shadow-color", "initial"]]),
			r.functional("text-shadow", (n) => {
				let f
				if (
					(n.modifier &&
						(n.modifier.kind === "arbitrary"
							? (f = n.modifier.value)
							: V(n.modifier.value) && (f = `${n.modifier.value}%`)),
					!n.value)
				) {
					const p = t.get(["--text-shadow"])
					return p === null
						? void 0
						: [
								R(),
								l("--tw-text-shadow-alpha", f),
								...se(
									"text-shadow",
									p,
									f,
									(x) => `var(--tw-text-shadow-color, ${x})`,
								),
							]
				}
				if (n.value.kind === "arbitrary") {
					let p = n.value.value
					switch (n.value.dataType ?? B(p, ["color"])) {
						case "color":
							return (
								(p = Q(p, n.modifier, t)),
								p === null
									? void 0
									: [
											R(),
											l(
												"--tw-text-shadow-color",
												Y(p, "var(--tw-text-shadow-alpha)"),
											),
										]
							)
						default:
							return [
								R(),
								l("--tw-text-shadow-alpha", f),
								...se(
									"text-shadow",
									p,
									f,
									(w) => `var(--tw-text-shadow-color, ${w})`,
								),
							]
					}
				}
				switch (n.value.value) {
					case "none":
						return n.modifier ? void 0 : [R(), l("text-shadow", "none")]
				}
				{
					const p = t.get([`--text-shadow-${n.value.value}`])
					if (p)
						return [
							R(),
							l("--tw-text-shadow-alpha", f),
							...se(
								"text-shadow",
								p,
								f,
								(x) => `var(--tw-text-shadow-color, ${x})`,
							),
						]
				}
				{
					const p = Z(n, t, ["--text-shadow-color", "--color"])
					if (p)
						return [
							R(),
							l("--tw-text-shadow-color", Y(p, "var(--tw-text-shadow-alpha)")),
						]
				}
			}),
			o("text-shadow", () => [
				{
					values: ["current", "inherit", "transparent"],
					valueThemeKeys: ["--text-shadow-color", "--color"],
					modifiers: Array.from({ length: 21 }, (n, f) => `${f * 5}`),
				},
				{ values: ["none"] },
				{
					valueThemeKeys: ["--text-shadow"],
					modifiers: Array.from({ length: 21 }, (n, f) => `${f * 5}`),
					hasDefaultValue: !0,
				},
			])
		{
			const w = ($) =>
					`var(--tw-ring-inset,) 0 0 0 calc(${$} + var(--tw-ring-offset-width)) var(--tw-ring-color, ${x})`,
				N = ($) => `inset 0 0 0 ${$} var(--tw-inset-ring-color, currentcolor)`
			var xe = w,
				Lt = N
			const n = [
					"var(--tw-inset-shadow)",
					"var(--tw-inset-ring-shadow)",
					"var(--tw-ring-offset-shadow)",
					"var(--tw-ring-shadow)",
					"var(--tw-shadow)",
				].join(", "),
				f = "0 0 #0000",
				p = () =>
					U([
						C("--tw-shadow", f),
						C("--tw-shadow-color"),
						C("--tw-shadow-alpha", "100%", "<percentage>"),
						C("--tw-inset-shadow", f),
						C("--tw-inset-shadow-color"),
						C("--tw-inset-shadow-alpha", "100%", "<percentage>"),
						C("--tw-ring-color"),
						C("--tw-ring-shadow", f),
						C("--tw-inset-ring-color"),
						C("--tw-inset-ring-shadow", f),
						C("--tw-ring-inset"),
						C("--tw-ring-offset-width", "0px", "<length>"),
						C("--tw-ring-offset-color", "#fff"),
						C("--tw-ring-offset-shadow", f),
					])
			e("shadow-initial", [p, ["--tw-shadow-color", "initial"]]),
				r.functional("shadow", ($) => {
					let S
					if (
						($.modifier &&
							($.modifier.kind === "arbitrary"
								? (S = $.modifier.value)
								: V($.modifier.value) && (S = `${$.modifier.value}%`)),
						!$.value)
					) {
						const z = t.get(["--shadow"])
						return z === null
							? void 0
							: [
									p(),
									l("--tw-shadow-alpha", S),
									...se(
										"--tw-shadow",
										z,
										S,
										(ie) => `var(--tw-shadow-color, ${ie})`,
									),
									l("box-shadow", n),
								]
					}
					if ($.value.kind === "arbitrary") {
						let z = $.value.value
						switch ($.value.dataType ?? B(z, ["color"])) {
							case "color":
								return (
									(z = Q(z, $.modifier, t)),
									z === null
										? void 0
										: [
												p(),
												l("--tw-shadow-color", Y(z, "var(--tw-shadow-alpha)")),
											]
								)
							default:
								return [
									p(),
									l("--tw-shadow-alpha", S),
									...se(
										"--tw-shadow",
										z,
										S,
										(gt) => `var(--tw-shadow-color, ${gt})`,
									),
									l("box-shadow", n),
								]
						}
					}
					switch ($.value.value) {
						case "none":
							return $.modifier
								? void 0
								: [p(), l("--tw-shadow", f), l("box-shadow", n)]
					}
					{
						const z = t.get([`--shadow-${$.value.value}`])
						if (z)
							return [
								p(),
								l("--tw-shadow-alpha", S),
								...se(
									"--tw-shadow",
									z,
									S,
									(ie) => `var(--tw-shadow-color, ${ie})`,
								),
								l("box-shadow", n),
							]
					}
					{
						const z = Z($, t, ["--box-shadow-color", "--color"])
						if (z)
							return [
								p(),
								l("--tw-shadow-color", Y(z, "var(--tw-shadow-alpha)")),
							]
					}
				}),
				o("shadow", () => [
					{
						values: ["current", "inherit", "transparent"],
						valueThemeKeys: ["--box-shadow-color", "--color"],
						modifiers: Array.from({ length: 21 }, ($, S) => `${S * 5}`),
					},
					{ values: ["none"] },
					{
						valueThemeKeys: ["--shadow"],
						modifiers: Array.from({ length: 21 }, ($, S) => `${S * 5}`),
						hasDefaultValue: !0,
					},
				]),
				e("inset-shadow-initial", [p, ["--tw-inset-shadow-color", "initial"]]),
				r.functional("inset-shadow", ($) => {
					let S
					if (
						($.modifier &&
							($.modifier.kind === "arbitrary"
								? (S = $.modifier.value)
								: V($.modifier.value) && (S = `${$.modifier.value}%`)),
						!$.value)
					) {
						const z = t.get(["--inset-shadow"])
						return z === null
							? void 0
							: [
									p(),
									l("--tw-inset-shadow-alpha", S),
									...se(
										"--tw-inset-shadow",
										z,
										S,
										(ie) => `var(--tw-inset-shadow-color, ${ie})`,
									),
									l("box-shadow", n),
								]
					}
					if ($.value.kind === "arbitrary") {
						let z = $.value.value
						switch ($.value.dataType ?? B(z, ["color"])) {
							case "color":
								return (
									(z = Q(z, $.modifier, t)),
									z === null
										? void 0
										: [
												p(),
												l(
													"--tw-inset-shadow-color",
													Y(z, "var(--tw-inset-shadow-alpha)"),
												),
											]
								)
							default:
								return [
									p(),
									l("--tw-inset-shadow-alpha", S),
									...se(
										"--tw-inset-shadow",
										z,
										S,
										(gt) => `var(--tw-inset-shadow-color, ${gt})`,
										"inset ",
									),
									l("box-shadow", n),
								]
						}
					}
					switch ($.value.value) {
						case "none":
							return $.modifier
								? void 0
								: [p(), l("--tw-inset-shadow", f), l("box-shadow", n)]
					}
					{
						const z = t.get([`--inset-shadow-${$.value.value}`])
						if (z)
							return [
								p(),
								l("--tw-inset-shadow-alpha", S),
								...se(
									"--tw-inset-shadow",
									z,
									S,
									(ie) => `var(--tw-inset-shadow-color, ${ie})`,
								),
								l("box-shadow", n),
							]
					}
					{
						const z = Z($, t, ["--box-shadow-color", "--color"])
						if (z)
							return [
								p(),
								l(
									"--tw-inset-shadow-color",
									Y(z, "var(--tw-inset-shadow-alpha)"),
								),
							]
					}
				}),
				o("inset-shadow", () => [
					{
						values: ["current", "inherit", "transparent"],
						valueThemeKeys: ["--box-shadow-color", "--color"],
						modifiers: Array.from({ length: 21 }, ($, S) => `${S * 5}`),
					},
					{ values: ["none"] },
					{
						valueThemeKeys: ["--inset-shadow"],
						modifiers: Array.from({ length: 21 }, ($, S) => `${S * 5}`),
						hasDefaultValue: !0,
					},
				]),
				e("ring-inset", [p, ["--tw-ring-inset", "inset"]])
			const x = t.get(["--default-ring-color"]) ?? "currentcolor"
			r.functional("ring", ($) => {
				if (!$.value) {
					if ($.modifier) return
					const S = t.get(["--default-ring-width"]) ?? "1px"
					return [p(), l("--tw-ring-shadow", w(S)), l("box-shadow", n)]
				}
				if ($.value.kind === "arbitrary") {
					let S = $.value.value
					switch ($.value.dataType ?? B(S, ["color", "length"])) {
						case "length":
							return $.modifier
								? void 0
								: [p(), l("--tw-ring-shadow", w(S)), l("box-shadow", n)]
						default:
							return (
								(S = Q(S, $.modifier, t)),
								S === null ? void 0 : [l("--tw-ring-color", S)]
							)
					}
				}
				{
					const S = Z($, t, ["--ring-color", "--color"])
					if (S) return [l("--tw-ring-color", S)]
				}
				{
					if ($.modifier) return
					let S = t.resolve($.value.value, ["--ring-width"])
					if ((S === null && V($.value.value) && (S = `${$.value.value}px`), S))
						return [p(), l("--tw-ring-shadow", w(S)), l("box-shadow", n)]
				}
			}),
				o("ring", () => [
					{
						values: ["current", "inherit", "transparent"],
						valueThemeKeys: ["--ring-color", "--color"],
						modifiers: Array.from({ length: 21 }, ($, S) => `${S * 5}`),
					},
					{
						values: ["0", "1", "2", "4", "8"],
						valueThemeKeys: ["--ring-width"],
						hasDefaultValue: !0,
					},
				]),
				r.functional("inset-ring", ($) => {
					if (!$.value)
						return $.modifier
							? void 0
							: [p(), l("--tw-inset-ring-shadow", N("1px")), l("box-shadow", n)]
					if ($.value.kind === "arbitrary") {
						let S = $.value.value
						switch ($.value.dataType ?? B(S, ["color", "length"])) {
							case "length":
								return $.modifier
									? void 0
									: [p(), l("--tw-inset-ring-shadow", N(S)), l("box-shadow", n)]
							default:
								return (
									(S = Q(S, $.modifier, t)),
									S === null ? void 0 : [l("--tw-inset-ring-color", S)]
								)
						}
					}
					{
						const S = Z($, t, ["--ring-color", "--color"])
						if (S) return [l("--tw-inset-ring-color", S)]
					}
					{
						if ($.modifier) return
						let S = t.resolve($.value.value, ["--ring-width"])
						if (
							(S === null && V($.value.value) && (S = `${$.value.value}px`), S)
						)
							return [
								p(),
								l("--tw-inset-ring-shadow", N(S)),
								l("box-shadow", n),
							]
					}
				}),
				o("inset-ring", () => [
					{
						values: ["current", "inherit", "transparent"],
						valueThemeKeys: ["--ring-color", "--color"],
						modifiers: Array.from({ length: 21 }, ($, S) => `${S * 5}`),
					},
					{
						values: ["0", "1", "2", "4", "8"],
						valueThemeKeys: ["--ring-width"],
						hasDefaultValue: !0,
					},
				])
			const O =
				"var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)"
			r.functional("ring-offset", ($) => {
				if ($.value) {
					if ($.value.kind === "arbitrary") {
						let S = $.value.value
						switch ($.value.dataType ?? B(S, ["color", "length"])) {
							case "length":
								return $.modifier
									? void 0
									: [
											l("--tw-ring-offset-width", S),
											l("--tw-ring-offset-shadow", O),
										]
							default:
								return (
									(S = Q(S, $.modifier, t)),
									S === null ? void 0 : [l("--tw-ring-offset-color", S)]
								)
						}
					}
					{
						const S = t.resolve($.value.value, ["--ring-offset-width"])
						if (S)
							return $.modifier
								? void 0
								: [
										l("--tw-ring-offset-width", S),
										l("--tw-ring-offset-shadow", O),
									]
						if (V($.value.value))
							return $.modifier
								? void 0
								: [
										l("--tw-ring-offset-width", `${$.value.value}px`),
										l("--tw-ring-offset-shadow", O),
									]
					}
					{
						const S = Z($, t, ["--ring-offset-color", "--color"])
						if (S) return [l("--tw-ring-offset-color", S)]
					}
				}
			})
		}
		return (
			o("ring-offset", () => [
				{
					values: ["current", "inherit", "transparent"],
					valueThemeKeys: ["--ring-offset-color", "--color"],
					modifiers: Array.from({ length: 21 }, (n, f) => `${f * 5}`),
				},
				{
					values: ["0", "1", "2", "4", "8"],
					valueThemeKeys: ["--ring-offset-width"],
				},
			]),
			r.functional("@container", (n) => {
				let f = null
				if (
					(n.value === null
						? (f = "inline-size")
						: n.value.kind === "arbitrary"
							? (f = n.value.value)
							: n.value.kind === "named" &&
								n.value.value === "normal" &&
								(f = "normal"),
					f !== null)
				)
					return n.modifier
						? [l("container-type", f), l("container-name", n.modifier.value)]
						: [l("container-type", f)]
			}),
			o("@container", () => [
				{ values: ["normal"], valueThemeKeys: [], hasDefaultValue: !0 },
			]),
			r
		)
	}
	var Vt = ["number", "integer", "ratio", "percentage"]
	function Ar(t) {
		const r = t.params
		return mi.test(r)
			? (o) => {
					const e = {
						"--value": {
							usedSpacingInteger: !1,
							usedSpacingNumber: !1,
							themeKeys: new Set(),
							literals: new Set(),
						},
						"--modifier": {
							usedSpacingInteger: !1,
							usedSpacingNumber: !1,
							themeKeys: new Set(),
							literals: new Set(),
						},
					}
					j(t.nodes, (i) => {
						if (
							i.kind !== "declaration" ||
							!i.value ||
							(!i.value.includes("--value(") &&
								!i.value.includes("--modifier("))
						)
							return
						const s = H(i.value)
						te(s, (a) => {
							if (a.kind !== "function") return
							if (
								a.value === "--spacing" &&
								!(
									e["--modifier"].usedSpacingNumber &&
									e["--value"].usedSpacingNumber
								)
							)
								return (
									te(a.nodes, (u) => {
										if (
											u.kind !== "function" ||
											(u.value !== "--value" && u.value !== "--modifier")
										)
											return
										const c = u.value
										for (const g of u.nodes)
											if (g.kind === "word") {
												if (g.value === "integer")
													e[c].usedSpacingInteger ||= !0
												else if (
													g.value === "number" &&
													((e[c].usedSpacingNumber ||= !0),
													e["--modifier"].usedSpacingNumber &&
														e["--value"].usedSpacingNumber)
												)
													return 2
											}
									}),
									0
								)
							if (a.value !== "--value" && a.value !== "--modifier") return
							const d = K(J(a.nodes), ",")
							for (let [u, c] of d.entries())
								(c = c.replace(/\\\*/g, "*")),
									(c = c.replace(/--(.*?)\s--(.*?)/g, "--$1-*--$2")),
									(c = c.replace(/\s+/g, "")),
									(c = c.replace(/(-\*){2,}/g, "-*")),
									c[0] === "-" &&
										c[1] === "-" &&
										!c.includes("-*") &&
										(c += "-*"),
									(d[u] = c)
							a.nodes = H(d.join(","))
							for (const u of a.nodes)
								if (
									u.kind === "word" &&
									(u.value[0] === '"' || u.value[0] === "'") &&
									u.value[0] === u.value[u.value.length - 1]
								) {
									const c = u.value.slice(1, -1)
									e[a.value].literals.add(c)
								} else if (
									u.kind === "word" &&
									u.value[0] === "-" &&
									u.value[1] === "-"
								) {
									const c = u.value.replace(/-\*.*$/g, "")
									e[a.value].themeKeys.add(c)
								} else if (
									u.kind === "word" &&
									!(
										u.value[0] === "[" && u.value[u.value.length - 1] === "]"
									) &&
									!Vt.includes(u.value)
								) {
									console.warn(`Unsupported bare value data type: "${u.value}".
Only valid data types are: ${Vt.map((A) => `"${A}"`).join(", ")}.
`)
									const c = u.value,
										g = structuredClone(a),
										m = "\xB6"
									te(g.nodes, (A, { replaceWith: y }) => {
										A.kind === "word" &&
											A.value === c &&
											y({ kind: "word", value: m })
									})
									const h = "^".repeat(J([u]).length),
										k = J([g]).indexOf(m),
										v = ["```css", J([a]), " ".repeat(k) + h, "```"].join(`
`)
									console.warn(v)
								}
						}),
							(i.value = J(s))
					}),
						o.utilities.functional(r.slice(0, -2), (i) => {
							const s = structuredClone(t),
								a = i.value,
								d = i.modifier
							if (a === null) return
							let u = !1,
								c = !1,
								g = !1,
								m = !1,
								h = new Map(),
								k = !1
							if (
								(j([s], (v, { parent: A, replaceWith: y }) => {
									if (
										(A?.kind !== "rule" && A?.kind !== "at-rule") ||
										v.kind !== "declaration" ||
										!v.value
									)
										return
									const b = H(v.value)
									;(te(b, (E, { replaceWith: P }) => {
										if (E.kind === "function") {
											if (E.value === "--value") {
												u = !0
												const _ = br(a, E, o)
												return _
													? ((c = !0),
														_.ratio ? (k = !0) : h.set(v, A),
														P(_.nodes),
														1)
													: ((u ||= !1), y([]), 2)
											} else if (E.value === "--modifier") {
												if (d === null) return y([]), 2
												g = !0
												const _ = br(d, E, o)
												return _
													? ((m = !0), P(_.nodes), 1)
													: ((g ||= !1), y([]), 2)
											}
										}
									}) ?? 0) === 0 && (v.value = J(b))
								}),
								(u && !c) || (g && !m) || (k && m) || (d && !k && !m))
							)
								return null
							if (k)
								for (const [v, A] of h) {
									const y = A.nodes.indexOf(v)
									y !== -1 && A.nodes.splice(y, 1)
								}
							return s.nodes
						}),
						o.utilities.suggest(r.slice(0, -2), () => {
							const i = [],
								s = []
							for (const [
								a,
								{
									literals: d,
									usedSpacingNumber: u,
									usedSpacingInteger: c,
									themeKeys: g,
								},
							] of [
								[i, e["--value"]],
								[s, e["--modifier"]],
							]) {
								for (const m of d) a.push(m)
								if (u) a.push(...rt)
								else if (c) for (const m of rt) V(m) && a.push(m)
								for (const m of o.theme.keysInNamespaces(g)) a.push(m)
							}
							return [{ values: i, modifiers: s }]
						})
				}
			: pi.test(r)
				? (o) => {
						o.utilities.static(r, () => structuredClone(t.nodes))
					}
				: null
	}
	function br(t, r, o) {
		for (const e of r.nodes) {
			if (
				t.kind === "named" &&
				e.kind === "word" &&
				(e.value[0] === "'" || e.value[0] === '"') &&
				e.value[e.value.length - 1] === e.value[0] &&
				e.value.slice(1, -1) === t.value
			)
				return { nodes: H(t.value) }
			if (
				t.kind === "named" &&
				e.kind === "word" &&
				e.value[0] === "-" &&
				e.value[1] === "-"
			) {
				let i = e.value
				if (i.endsWith("-*")) {
					i = i.slice(0, -2)
					const s = o.theme.resolve(t.value, [i])
					if (s) return { nodes: H(s) }
				} else {
					const s = i.split("-*")
					if (s.length <= 1) continue
					const a = [s.shift()],
						d = o.theme.resolveWith(t.value, a, s)
					if (d) {
						const [, u = {}] = d
						{
							const c = u[s.pop()]
							if (c) return { nodes: H(c) }
						}
					}
				}
			} else if (t.kind === "named" && e.kind === "word") {
				if (!Vt.includes(e.value)) continue
				const i = e.value === "ratio" && "fraction" in t ? t.fraction : t.value
				if (!i) continue
				const s = B(i, [e.value])
				if (s === null) continue
				if (s === "ratio") {
					const [a, d] = K(i, "/")
					if (!V(a) || !V(d)) continue
				} else {
					if (s === "number" && !we(i)) continue
					if (s === "percentage" && !V(i.slice(0, -1))) continue
				}
				return { nodes: H(i), ratio: s === "ratio" }
			} else if (
				t.kind === "arbitrary" &&
				e.kind === "word" &&
				e.value[0] === "[" &&
				e.value[e.value.length - 1] === "]"
			) {
				const i = e.value.slice(1, -1)
				if (i === "*") return { nodes: H(t.value) }
				if ("dataType" in t && t.dataType && t.dataType !== i) continue
				if ("dataType" in t && t.dataType) return { nodes: H(t.value) }
				if (B(t.value, [i]) !== null) return { nodes: H(t.value) }
			}
		}
	}
	function se(t, r, o, e, i = "") {
		let s = !1,
			a = _e(r, (u) =>
				o == null
					? e(u)
					: u.startsWith("current")
						? e(Y(u, o))
						: ((u.startsWith("var(") || o.startsWith("var(")) && (s = !0),
							e(yr(u, o))),
			)
		function d(u) {
			return i
				? K(u, ",")
						.map((c) => i + c)
						.join(",")
				: u
		}
		return s
			? [
					l(t, d(_e(r, e))),
					M("@supports (color: lab(from red l a b))", [l(t, d(a))]),
				]
			: [l(t, d(a))]
	}
	function tt(t, r, o, e, i = "") {
		let s = !1,
			a = K(r, ",")
				.map((d) =>
					_e(d, (u) =>
						o == null
							? e(u)
							: u.startsWith("current")
								? e(Y(u, o))
								: ((u.startsWith("var(") || o.startsWith("var(")) && (s = !0),
									e(yr(u, o))),
					),
				)
				.map((d) => `drop-shadow(${d})`)
				.join(" ")
		return s
			? [
					l(
						t,
						i +
							K(r, ",")
								.map((d) => `drop-shadow(${_e(d, e)})`)
								.join(" "),
					),
					M("@supports (color: lab(from red l a b))", [l(t, i + a)]),
				]
			: [l(t, i + a)]
	}
	var Et = { "--alpha": gi, "--spacing": hi, "--theme": ki, theme: vi }
	function gi(t, r, o, ...e) {
		const [i, s] = K(o, "/").map((a) => a.trim())
		if (!i || !s)
			throw new Error(
				`The --alpha(\u2026) function requires a color and an alpha value, e.g.: \`--alpha(${i || "var(--my-color)"} / ${s || "50%"})\``,
			)
		if (e.length > 0)
			throw new Error(
				`The --alpha(\u2026) function only accepts one argument, e.g.: \`--alpha(${i || "var(--my-color)"} / ${s || "50%"})\``,
			)
		return Y(i, s)
	}
	function hi(t, r, o, ...e) {
		if (!o)
			throw new Error(
				"The --spacing(\u2026) function requires an argument, but received none.",
			)
		if (e.length > 0)
			throw new Error(
				`The --spacing(\u2026) function only accepts a single argument, but received ${e.length + 1}.`,
			)
		const i = t.theme.resolve(null, ["--spacing"])
		if (!i)
			throw new Error(
				"The --spacing(\u2026) function requires that the `--spacing` theme variable exists, but it was not found.",
			)
		return `calc(${i} * ${o})`
	}
	function ki(t, r, o, ...e) {
		if (!o.startsWith("--"))
			throw new Error(
				"The --theme(\u2026) function can only be used with CSS variables from your theme.",
			)
		let i = !1
		o.endsWith(" inline") && ((i = !0), (o = o.slice(0, -7))),
			r.kind === "at-rule" && (i = !0)
		const s = t.resolveThemeValue(o, i)
		if (!s) {
			if (e.length > 0) return e.join(", ")
			throw new Error(
				`Could not resolve value for theme function: \`theme(${o})\`. Consider checking if the variable name is correct or provide a fallback value to silence this error.`,
			)
		}
		if (e.length === 0) return s
		const a = e.join(", ")
		if (a === "initial") return s
		if (s === "initial") return a
		if (
			s.startsWith("var(") ||
			s.startsWith("theme(") ||
			s.startsWith("--theme(")
		) {
			const d = H(s)
			return bi(d, a), J(d)
		}
		return s
	}
	function vi(t, r, o, ...e) {
		o = wi(o)
		const i = t.resolveThemeValue(o)
		if (!i && e.length > 0) return e.join(", ")
		if (!i)
			throw new Error(
				`Could not resolve value for theme function: \`theme(${o})\`. Consider checking if the path is correct or provide a fallback value to silence this error.`,
			)
		return i
	}
	var Cr = new RegExp(
		Object.keys(Et)
			.map((t) => `${t}\\(`)
			.join("|"),
	)
	function $e(t, r) {
		let o = 0
		return (
			j(t, (e) => {
				if (e.kind === "declaration" && e.value && Cr.test(e.value)) {
					;(o |= 8), (e.value = Nr(e.value, e, r))
					return
				}
				e.kind === "at-rule" &&
					(e.name === "@media" ||
						e.name === "@custom-media" ||
						e.name === "@container" ||
						e.name === "@supports") &&
					Cr.test(e.params) &&
					((o |= 8), (e.params = Nr(e.params, e, r)))
			}),
			o
		)
	}
	function Nr(t, r, o) {
		const e = H(t)
		return (
			te(e, (i, { replaceWith: s }) => {
				if (i.kind === "function" && i.value in Et) {
					const a = K(J(i.nodes).trim(), ",").map((u) => u.trim()),
						d = Et[i.value](o, r, ...a)
					return s(H(d))
				}
			}),
			J(e)
		)
	}
	function wi(t) {
		if (t[0] !== "'" && t[0] !== '"') return t
		let r = "",
			o = t[0]
		for (let e = 1; e < t.length - 1; e++) {
			const i = t[e],
				s = t[e + 1]
			i === "\\" && (s === o || s === "\\") ? ((r += s), e++) : (r += i)
		}
		return r
	}
	function bi(t, r) {
		te(t, (o) => {
			if (
				o.kind === "function" &&
				!(o.value !== "var" && o.value !== "theme" && o.value !== "--theme")
			)
				if (o.nodes.length === 1)
					o.nodes.push({ kind: "word", value: `, ${r}` })
				else {
					const e = o.nodes[o.nodes.length - 1]
					e.kind === "word" && e.value === "initial" && (e.value = r)
				}
		})
	}
	function ot(t, r) {
		const o = t.length,
			e = r.length,
			i = o < e ? o : e
		for (let s = 0; s < i; s++) {
			let a = t.charCodeAt(s),
				d = r.charCodeAt(s)
			if (a >= 48 && a <= 57 && d >= 48 && d <= 57) {
				let u = s,
					c = s + 1,
					g = s,
					m = s + 1
				for (a = t.charCodeAt(c); a >= 48 && a <= 57; ) a = t.charCodeAt(++c)
				for (d = r.charCodeAt(m); d >= 48 && d <= 57; ) d = r.charCodeAt(++m)
				const h = t.slice(u, c),
					k = r.slice(g, m),
					v = Number(h) - Number(k)
				if (v) return v
				if (h < k) return -1
				if (h > k) return 1
				continue
			}
			if (a !== d) return a - d
		}
		return t.length - r.length
	}
	var yi = /^\d+\/\d+$/
	function $r(t) {
		const r = []
		for (const e of t.utilities.keys("static"))
			r.push({ name: e, utility: e, fraction: !1, modifiers: [] })
		for (const e of t.utilities.keys("functional")) {
			const i = t.utilities.getCompletions(e)
			for (const s of i)
				for (const a of s.values) {
					const d = a !== null && yi.test(a),
						u = a === null ? e : `${e}-${a}`
					r.push({ name: u, utility: e, fraction: d, modifiers: s.modifiers }),
						s.supportsNegative &&
							r.push({
								name: `-${u}`,
								utility: `-${e}`,
								fraction: d,
								modifiers: s.modifiers,
							})
				}
		}
		return r.length === 0 ? [] : (r.sort((e, i) => ot(e.name, i.name)), xi(r))
	}
	function xi(t) {
		let r = [],
			o = null,
			e = new Map(),
			i = new q(() => [])
		for (const a of t) {
			const { utility: d, fraction: u } = a
			o || ((o = { utility: d, items: [] }), e.set(d, o)),
				d !== o.utility &&
					(r.push(o), (o = { utility: d, items: [] }), e.set(d, o)),
				u ? i.get(d).push(a) : o.items.push(a)
		}
		o && r[r.length - 1] !== o && r.push(o)
		for (const [a, d] of i) {
			const u = e.get(a)
			u && u.items.push(...d)
		}
		const s = []
		for (const a of r)
			for (const d of a.items) s.push([d.name, { modifiers: d.modifiers }])
		return s
	}
	function Sr(t) {
		const r = []
		for (const [e, i] of t.variants.entries()) {
			const d = ({ value: u, modifier: c } = {}) => {
				let g = e
				u && (g += s ? `-${u}` : u), c && (g += `/${c}`)
				const m = t.parseVariant(g)
				if (!m) return []
				const h = I(".__placeholder__", [])
				if (Se(h, m, t.variants) === null) return []
				const k = []
				return (
					Ye(h.nodes, (v, { path: A }) => {
						if (
							(v.kind !== "rule" && v.kind !== "at-rule") ||
							v.nodes.length > 0
						)
							return
						A.sort((T, E) => {
							const P = T.kind === "at-rule",
								_ = E.kind === "at-rule"
							return P && !_ ? -1 : !P && _ ? 1 : 0
						})
						let y = A.flatMap((T) =>
								T.kind === "rule"
									? T.selector === "&"
										? []
										: [T.selector]
									: T.kind === "at-rule"
										? [`${T.name} ${T.params}`]
										: [],
							),
							b = ""
						for (let T = y.length - 1; T >= 0; T--)
							b = b === "" ? y[T] : `${y[T]} { ${b} }`
						k.push(b)
					}),
					k
				)
			}
			var o = d
			if (i.kind === "arbitrary") continue
			const s = e !== "@",
				a = t.variants.getCompletions(e)
			switch (i.kind) {
				case "static": {
					r.push({
						name: e,
						values: a,
						isArbitrary: !1,
						hasDash: s,
						selectors: d,
					})
					break
				}
				case "functional": {
					r.push({
						name: e,
						values: a,
						isArbitrary: !0,
						hasDash: s,
						selectors: d,
					})
					break
				}
				case "compound": {
					r.push({
						name: e,
						values: a,
						isArbitrary: !0,
						hasDash: s,
						selectors: d,
					})
					break
				}
			}
		}
		return r
	}
	function Tr(t, r) {
		let { astNodes: o, nodeSorting: e } = pe(Array.from(r), t),
			i = new Map(r.map((a) => [a, null])),
			s = 0n
		for (const a of o) {
			const d = e.get(a)?.candidate
			d && i.set(d, i.get(d) ?? s++)
		}
		return r.map((a) => [a, i.get(a) ?? null])
	}
	var it = /^@?[a-zA-Z0-9_-]*$/
	var Ot = class {
		compareFns = new Map()
		variants = new Map()
		completions = new Map()
		groupOrder = null
		lastOrder = 0
		static(r, o, { compounds: e, order: i } = {}) {
			this.set(r, {
				kind: "static",
				applyFn: o,
				compoundsWith: 0,
				compounds: e ?? 2,
				order: i,
			})
		}
		fromAst(r, o) {
			const e = []
			j(o, (i) => {
				i.kind === "rule"
					? e.push(i.selector)
					: i.kind === "at-rule" &&
						i.name !== "@slot" &&
						e.push(`${i.name} ${i.params}`)
			}),
				this.static(
					r,
					(i) => {
						const s = structuredClone(o)
						Pt(s, i.nodes), (i.nodes = s)
					},
					{ compounds: be(e) },
				)
		}
		functional(r, o, { compounds: e, order: i } = {}) {
			this.set(r, {
				kind: "functional",
				applyFn: o,
				compoundsWith: 0,
				compounds: e ?? 2,
				order: i,
			})
		}
		compound(r, o, e, { compounds: i, order: s } = {}) {
			this.set(r, {
				kind: "compound",
				applyFn: e,
				compoundsWith: o,
				compounds: i ?? 2,
				order: s,
			})
		}
		group(r, o) {
			;(this.groupOrder = this.nextOrder()),
				o && this.compareFns.set(this.groupOrder, o),
				r(),
				(this.groupOrder = null)
		}
		has(r) {
			return this.variants.has(r)
		}
		get(r) {
			return this.variants.get(r)
		}
		kind(r) {
			return this.variants.get(r)?.kind
		}
		compoundsWith(r, o) {
			const e = this.variants.get(r),
				i =
					typeof o == "string"
						? this.variants.get(o)
						: o.kind === "arbitrary"
							? { compounds: be([o.selector]) }
							: this.variants.get(o.root)
			return !(
				!e ||
				!i ||
				e.kind !== "compound" ||
				i.compounds === 0 ||
				e.compoundsWith === 0 ||
				(e.compoundsWith & i.compounds) === 0
			)
		}
		suggest(r, o) {
			this.completions.set(r, o)
		}
		getCompletions(r) {
			return this.completions.get(r)?.() ?? []
		}
		compare(r, o) {
			if (r === o) return 0
			if (r === null) return -1
			if (o === null) return 1
			if (r.kind === "arbitrary" && o.kind === "arbitrary")
				return r.selector < o.selector ? -1 : 1
			if (r.kind === "arbitrary") return 1
			if (o.kind === "arbitrary") return -1
			const e = this.variants.get(r.root).order,
				i = this.variants.get(o.root).order,
				s = e - i
			if (s !== 0) return s
			if (r.kind === "compound" && o.kind === "compound") {
				const c = this.compare(r.variant, o.variant)
				return c !== 0
					? c
					: r.modifier && o.modifier
						? r.modifier.value < o.modifier.value
							? -1
							: 1
						: r.modifier
							? 1
							: o.modifier
								? -1
								: 0
			}
			const a = this.compareFns.get(e)
			if (a !== void 0) return a(r, o)
			if (r.root !== o.root) return r.root < o.root ? -1 : 1
			const d = r.value,
				u = o.value
			return d === null
				? -1
				: u === null || (d.kind === "arbitrary" && u.kind !== "arbitrary")
					? 1
					: (d.kind !== "arbitrary" && u.kind === "arbitrary") ||
							d.value < u.value
						? -1
						: 1
		}
		keys() {
			return this.variants.keys()
		}
		entries() {
			return this.variants.entries()
		}
		set(r, { kind: o, applyFn: e, compounds: i, compoundsWith: s, order: a }) {
			const d = this.variants.get(r)
			d
				? Object.assign(d, { kind: o, applyFn: e, compounds: i })
				: (a === void 0 &&
						((this.lastOrder = this.nextOrder()), (a = this.lastOrder)),
					this.variants.set(r, {
						kind: o,
						applyFn: e,
						order: a,
						compoundsWith: s,
						compounds: i,
					}))
		}
		nextOrder() {
			return this.groupOrder ?? this.lastOrder + 1
		}
	}
	function be(t) {
		let r = 0
		for (const o of t) {
			if (o[0] === "@") {
				if (
					!o.startsWith("@media") &&
					!o.startsWith("@supports") &&
					!o.startsWith("@container")
				)
					return 0
				r |= 1
				continue
			}
			if (o.includes("::")) return 0
			r |= 2
		}
		return r
	}
	function Er(t) {
		const r = new Ot()
		function o(c, g, { compounds: m } = {}) {
			;(m = m ?? be(g)),
				r.static(
					c,
					(h) => {
						h.nodes = g.map((k) => M(k, h.nodes))
					},
					{ compounds: m },
				)
		}
		o("*", [":is(& > *)"], { compounds: 0 }),
			o("**", [":is(& *)"], { compounds: 0 })
		function e(c, g) {
			return g.map((m) => {
				m = m.trim()
				const h = K(m, " ")
				return h[0] === "not"
					? h.slice(1).join(" ")
					: c === "@container"
						? h[0][0] === "("
							? `not ${m}`
							: h[1] === "not"
								? `${h[0]} ${h.slice(2).join(" ")}`
								: `${h[0]} not ${h.slice(1).join(" ")}`
						: `not ${m}`
			})
		}
		const i = ["@media", "@supports", "@container"]
		function s(c) {
			for (const g of i) {
				if (g !== c.name) continue
				let m = K(c.params, ",")
				return m.length > 1
					? null
					: ((m = e(c.name, m)), D(c.name, m.join(", ")))
			}
			return null
		}
		function a(c) {
			return c.includes("::")
				? null
				: `&:not(${K(c, ",")
						.map((m) => ((m = m.replaceAll("&", "*")), m))
						.join(", ")})`
		}
		r.compound("not", 3, (c, g) => {
			if ((g.variant.kind === "arbitrary" && g.variant.relative) || g.modifier)
				return null
			let m = !1
			if (
				(j([c], (h, { path: k }) => {
					if (h.kind !== "rule" && h.kind !== "at-rule") return 0
					if (h.nodes.length > 0) return 0
					const v = [],
						A = []
					for (const b of k)
						b.kind === "at-rule" ? v.push(b) : b.kind === "rule" && A.push(b)
					if (v.length > 1) return 2
					if (A.length > 1) return 2
					const y = []
					for (const b of A) {
						const T = a(b.selector)
						if (!T) return (m = !1), 2
						y.push(I(T, []))
					}
					for (const b of v) {
						const T = s(b)
						if (!T) return (m = !1), 2
						y.push(T)
					}
					return Object.assign(c, I("&", y)), (m = !0), 1
				}),
				c.kind === "rule" &&
					c.selector === "&" &&
					c.nodes.length === 1 &&
					Object.assign(c, c.nodes[0]),
				!m)
			)
				return null
		}),
			r.suggest("not", () =>
				Array.from(r.keys()).filter((c) => r.compoundsWith("not", c)),
			),
			r.compound("group", 2, (c, g) => {
				if (g.variant.kind === "arbitrary" && g.variant.relative) return null
				let m = g.modifier
						? `:where(.${t.prefix ? `${t.prefix}\\:` : ""}group\\/${g.modifier.value})`
						: `:where(.${t.prefix ? `${t.prefix}\\:` : ""}group)`,
					h = !1
				if (
					(j([c], (k, { path: v }) => {
						if (k.kind !== "rule") return 0
						for (const y of v.slice(0, -1))
							if (y.kind === "rule") return (h = !1), 2
						let A = k.selector.replaceAll("&", m)
						K(A, ",").length > 1 && (A = `:is(${A})`),
							(k.selector = `&:is(${A} *)`),
							(h = !0)
					}),
					!h)
				)
					return null
			}),
			r.suggest("group", () =>
				Array.from(r.keys()).filter((c) => r.compoundsWith("group", c)),
			),
			r.compound("peer", 2, (c, g) => {
				if (g.variant.kind === "arbitrary" && g.variant.relative) return null
				let m = g.modifier
						? `:where(.${t.prefix ? `${t.prefix}\\:` : ""}peer\\/${g.modifier.value})`
						: `:where(.${t.prefix ? `${t.prefix}\\:` : ""}peer)`,
					h = !1
				if (
					(j([c], (k, { path: v }) => {
						if (k.kind !== "rule") return 0
						for (const y of v.slice(0, -1))
							if (y.kind === "rule") return (h = !1), 2
						let A = k.selector.replaceAll("&", m)
						K(A, ",").length > 1 && (A = `:is(${A})`),
							(k.selector = `&:is(${A} ~ *)`),
							(h = !0)
					}),
					!h)
				)
					return null
			}),
			r.suggest("peer", () =>
				Array.from(r.keys()).filter((c) => r.compoundsWith("peer", c)),
			),
			o("first-letter", ["&::first-letter"]),
			o("first-line", ["&::first-line"]),
			o("marker", [
				"& *::marker",
				"&::marker",
				"& *::-webkit-details-marker",
				"&::-webkit-details-marker",
			]),
			o("selection", ["& *::selection", "&::selection"]),
			o("file", ["&::file-selector-button"]),
			o("placeholder", ["&::placeholder"]),
			o("backdrop", ["&::backdrop"]),
			o("details-content", ["&::details-content"])
		{
			const c = () =>
				U([
					D("@property", "--tw-content", [
						l("syntax", '"*"'),
						l("initial-value", '""'),
						l("inherits", "false"),
					]),
				])
			var d = c
			r.static(
				"before",
				(g) => {
					g.nodes = [
						I("&::before", [
							c(),
							l("content", "var(--tw-content)"),
							...g.nodes,
						]),
					]
				},
				{ compounds: 0 },
			),
				r.static(
					"after",
					(g) => {
						g.nodes = [
							I("&::after", [
								c(),
								l("content", "var(--tw-content)"),
								...g.nodes,
							]),
						]
					},
					{ compounds: 0 },
				)
		}
		o("first", ["&:first-child"]),
			o("last", ["&:last-child"]),
			o("only", ["&:only-child"]),
			o("odd", ["&:nth-child(odd)"]),
			o("even", ["&:nth-child(even)"]),
			o("first-of-type", ["&:first-of-type"]),
			o("last-of-type", ["&:last-of-type"]),
			o("only-of-type", ["&:only-of-type"]),
			o("visited", ["&:visited"]),
			o("target", ["&:target"]),
			o("open", ["&:is([open], :popover-open, :open)"]),
			o("default", ["&:default"]),
			o("checked", ["&:checked"]),
			o("indeterminate", ["&:indeterminate"]),
			o("placeholder-shown", ["&:placeholder-shown"]),
			o("autofill", ["&:autofill"]),
			o("optional", ["&:optional"]),
			o("required", ["&:required"]),
			o("valid", ["&:valid"]),
			o("invalid", ["&:invalid"]),
			o("user-valid", ["&:user-valid"]),
			o("user-invalid", ["&:user-invalid"]),
			o("in-range", ["&:in-range"]),
			o("out-of-range", ["&:out-of-range"]),
			o("read-only", ["&:read-only"]),
			o("empty", ["&:empty"]),
			o("focus-within", ["&:focus-within"]),
			r.static("hover", (c) => {
				c.nodes = [I("&:hover", [D("@media", "(hover: hover)", c.nodes)])]
			}),
			o("focus", ["&:focus"]),
			o("focus-visible", ["&:focus-visible"]),
			o("active", ["&:active"]),
			o("enabled", ["&:enabled"]),
			o("disabled", ["&:disabled"]),
			o("inert", ["&:is([inert], [inert] *)"]),
			r.compound("in", 2, (c, g) => {
				if (g.modifier) return null
				let m = !1
				if (
					(j([c], (h, { path: k }) => {
						if (h.kind !== "rule") return 0
						for (const v of k.slice(0, -1))
							if (v.kind === "rule") return (m = !1), 2
						;(h.selector = `:where(${h.selector.replaceAll("&", "*")}) &`),
							(m = !0)
					}),
					!m)
				)
					return null
			}),
			r.suggest("in", () =>
				Array.from(r.keys()).filter((c) => r.compoundsWith("in", c)),
			),
			r.compound("has", 2, (c, g) => {
				if (g.modifier) return null
				let m = !1
				if (
					(j([c], (h, { path: k }) => {
						if (h.kind !== "rule") return 0
						for (const v of k.slice(0, -1))
							if (v.kind === "rule") return (m = !1), 2
						;(h.selector = `&:has(${h.selector.replaceAll("&", "*")})`),
							(m = !0)
					}),
					!m)
				)
					return null
			}),
			r.suggest("has", () =>
				Array.from(r.keys()).filter((c) => r.compoundsWith("has", c)),
			),
			r.functional("aria", (c, g) => {
				if (!g.value || g.modifier) return null
				g.value.kind === "arbitrary"
					? (c.nodes = [I(`&[aria-${Vr(g.value.value)}]`, c.nodes)])
					: (c.nodes = [I(`&[aria-${g.value.value}="true"]`, c.nodes)])
			}),
			r.suggest("aria", () => [
				"busy",
				"checked",
				"disabled",
				"expanded",
				"hidden",
				"pressed",
				"readonly",
				"required",
				"selected",
			]),
			r.functional("data", (c, g) => {
				if (!g.value || g.modifier) return null
				c.nodes = [I(`&[data-${Vr(g.value.value)}]`, c.nodes)]
			}),
			r.functional("nth", (c, g) => {
				if (
					!g.value ||
					g.modifier ||
					(g.value.kind === "named" && !V(g.value.value))
				)
					return null
				c.nodes = [I(`&:nth-child(${g.value.value})`, c.nodes)]
			}),
			r.functional("nth-last", (c, g) => {
				if (
					!g.value ||
					g.modifier ||
					(g.value.kind === "named" && !V(g.value.value))
				)
					return null
				c.nodes = [I(`&:nth-last-child(${g.value.value})`, c.nodes)]
			}),
			r.functional("nth-of-type", (c, g) => {
				if (
					!g.value ||
					g.modifier ||
					(g.value.kind === "named" && !V(g.value.value))
				)
					return null
				c.nodes = [I(`&:nth-of-type(${g.value.value})`, c.nodes)]
			}),
			r.functional("nth-last-of-type", (c, g) => {
				if (
					!g.value ||
					g.modifier ||
					(g.value.kind === "named" && !V(g.value.value))
				)
					return null
				c.nodes = [I(`&:nth-last-of-type(${g.value.value})`, c.nodes)]
			}),
			r.functional(
				"supports",
				(c, g) => {
					if (!g.value || g.modifier) return null
					let m = g.value.value
					if (m === null) return null
					if (/^[\w-]*\s*\(/.test(m)) {
						const h = m.replace(/\b(and|or|not)\b/g, " $1 ")
						c.nodes = [D("@supports", h, c.nodes)]
						return
					}
					m.includes(":") || (m = `${m}: var(--tw)`),
						(m[0] !== "(" || m[m.length - 1] !== ")") && (m = `(${m})`),
						(c.nodes = [D("@supports", m, c.nodes)])
				},
				{ compounds: 1 },
			),
			o("motion-safe", ["@media (prefers-reduced-motion: no-preference)"]),
			o("motion-reduce", ["@media (prefers-reduced-motion: reduce)"]),
			o("contrast-more", ["@media (prefers-contrast: more)"]),
			o("contrast-less", ["@media (prefers-contrast: less)"])
		{
			const c = (g, m, h, k) => {
				if (g === m) return 0
				const v = k.get(g)
				if (v === null) return h === "asc" ? -1 : 1
				const A = k.get(m)
				return A === null ? (h === "asc" ? 1 : -1) : ve(v, A, h)
			}
			var u = c
			{
				const g = t.namespace("--breakpoint"),
					m = new q((h) => {
						switch (h.kind) {
							case "static":
								return t.resolveValue(h.root, ["--breakpoint"]) ?? null
							case "functional": {
								if (!h.value || h.modifier) return null
								let k = null
								return (
									h.value.kind === "arbitrary"
										? (k = h.value.value)
										: h.value.kind === "named" &&
											(k = t.resolveValue(h.value.value, ["--breakpoint"])),
									!k || k.includes("var(") ? null : k
								)
							}
							case "arbitrary":
							case "compound":
								return null
						}
					})
				r.group(
					() => {
						r.functional(
							"max",
							(h, k) => {
								if (k.modifier) return null
								const v = m.get(k)
								if (v === null) return null
								h.nodes = [D("@media", `(width < ${v})`, h.nodes)]
							},
							{ compounds: 1 },
						)
					},
					(h, k) => c(h, k, "desc", m),
				),
					r.suggest("max", () =>
						Array.from(g.keys()).filter((h) => h !== null),
					),
					r.group(
						() => {
							for (const [h, k] of t.namespace("--breakpoint"))
								h !== null &&
									r.static(
										h,
										(v) => {
											v.nodes = [D("@media", `(width >= ${k})`, v.nodes)]
										},
										{ compounds: 1 },
									)
							r.functional(
								"min",
								(h, k) => {
									if (k.modifier) return null
									const v = m.get(k)
									if (v === null) return null
									h.nodes = [D("@media", `(width >= ${v})`, h.nodes)]
								},
								{ compounds: 1 },
							)
						},
						(h, k) => c(h, k, "asc", m),
					),
					r.suggest("min", () => Array.from(g.keys()).filter((h) => h !== null))
			}
			{
				const g = t.namespace("--container"),
					m = new q((h) => {
						switch (h.kind) {
							case "functional": {
								if (h.value === null) return null
								let k = null
								return (
									h.value.kind === "arbitrary"
										? (k = h.value.value)
										: h.value.kind === "named" &&
											(k = t.resolveValue(h.value.value, ["--container"])),
									!k || k.includes("var(") ? null : k
								)
							}
							case "static":
							case "arbitrary":
							case "compound":
								return null
						}
					})
				r.group(
					() => {
						r.functional(
							"@max",
							(h, k) => {
								const v = m.get(k)
								if (v === null) return null
								h.nodes = [
									D(
										"@container",
										k.modifier
											? `${k.modifier.value} (width < ${v})`
											: `(width < ${v})`,
										h.nodes,
									),
								]
							},
							{ compounds: 1 },
						)
					},
					(h, k) => c(h, k, "desc", m),
				),
					r.suggest("@max", () =>
						Array.from(g.keys()).filter((h) => h !== null),
					),
					r.group(
						() => {
							r.functional(
								"@",
								(h, k) => {
									const v = m.get(k)
									if (v === null) return null
									h.nodes = [
										D(
											"@container",
											k.modifier
												? `${k.modifier.value} (width >= ${v})`
												: `(width >= ${v})`,
											h.nodes,
										),
									]
								},
								{ compounds: 1 },
							),
								r.functional(
									"@min",
									(h, k) => {
										const v = m.get(k)
										if (v === null) return null
										h.nodes = [
											D(
												"@container",
												k.modifier
													? `${k.modifier.value} (width >= ${v})`
													: `(width >= ${v})`,
												h.nodes,
											),
										]
									},
									{ compounds: 1 },
								)
						},
						(h, k) => c(h, k, "asc", m),
					),
					r.suggest("@min", () =>
						Array.from(g.keys()).filter((h) => h !== null),
					),
					r.suggest("@", () => Array.from(g.keys()).filter((h) => h !== null))
			}
		}
		return (
			o("portrait", ["@media (orientation: portrait)"]),
			o("landscape", ["@media (orientation: landscape)"]),
			o("ltr", ['&:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)']),
			o("rtl", ['&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)']),
			o("dark", ["@media (prefers-color-scheme: dark)"]),
			o("starting", ["@starting-style"]),
			o("print", ["@media print"]),
			o("forced-colors", ["@media (forced-colors: active)"]),
			o("inverted-colors", ["@media (inverted-colors: inverted)"]),
			o("pointer-none", ["@media (pointer: none)"]),
			o("pointer-coarse", ["@media (pointer: coarse)"]),
			o("pointer-fine", ["@media (pointer: fine)"]),
			o("any-pointer-none", ["@media (any-pointer: none)"]),
			o("any-pointer-coarse", ["@media (any-pointer: coarse)"]),
			o("any-pointer-fine", ["@media (any-pointer: fine)"]),
			o("noscript", ["@media (scripting: none)"]),
			r
		)
	}
	function Vr(t) {
		if (t.includes("=")) {
			const [r, ...o] = K(t, "="),
				e = o.join("=").trim()
			if (e[0] === "'" || e[0] === '"') return t
			if (e.length > 1) {
				const i = e[e.length - 1]
				if (
					e[e.length - 2] === " " &&
					(i === "i" || i === "I" || i === "s" || i === "S")
				)
					return `${r}="${e.slice(0, -2)}" ${i}`
			}
			return `${r}="${e}"`
		}
		return t
	}
	function Pt(t, r) {
		j(t, (o, { replaceWith: e }) => {
			if (o.kind === "at-rule" && o.name === "@slot") e(r)
			else if (
				o.kind === "at-rule" &&
				(o.name === "@keyframes" || o.name === "@property")
			)
				return Object.assign(o, U([D(o.name, o.params, o.nodes)])), 1
		})
	}
	function Rr(t) {
		const r = xr(t),
			o = Er(t),
			e = new q((u) => pr(u, d)),
			i = new q((u) => Array.from(dr(u, d))),
			s = new q((u) => {
				const c = Or(u, d)
				try {
					$e(
						c.map(({ node: g }) => g),
						d,
					)
				} catch {
					return []
				}
				return c
			}),
			a = new q((u) => {
				for (const c of Ge(u)) t.markUsedVariable(c)
			}),
			d = {
				theme: t,
				utilities: r,
				variants: o,
				invalidCandidates: new Set(),
				important: !1,
				candidatesToCss(u) {
					const c = []
					for (const g of u) {
						let m = !1,
							{ astNodes: h } = pe([g], this, {
								onInvalidCandidate() {
									m = !0
								},
							})
						;(h = ke(h, d, 0)),
							h.length === 0 || m ? c.push(null) : c.push(re(h))
					}
					return c
				},
				getClassOrder(u) {
					return Tr(this, u)
				},
				getClassList() {
					return $r(this)
				},
				getVariants() {
					return Sr(this)
				},
				parseCandidate(u) {
					return i.get(u)
				},
				parseVariant(u) {
					return e.get(u)
				},
				compileAstNodes(u) {
					return s.get(u)
				},
				getVariantOrder() {
					const u = Array.from(e.values())
					u.sort((h, k) => this.variants.compare(h, k))
					let c = new Map(),
						g,
						m = 0
					for (const h of u)
						h !== null &&
							(g !== void 0 && this.variants.compare(g, h) !== 0 && m++,
							c.set(h, m),
							(g = h))
					return c
				},
				resolveThemeValue(u, c = !0) {
					let g = u.lastIndexOf("/"),
						m = null
					g !== -1 && ((m = u.slice(g + 1).trim()), (u = u.slice(0, g).trim()))
					const h = t.resolve(null, [u], c ? 1 : 0) ?? void 0
					return m && h ? Y(h, m) : h
				},
				trackUsedVariables(u) {
					a.get(u)
				},
			}
		return d
	}
	var _t = [
		"container-type",
		"pointer-events",
		"visibility",
		"position",
		"inset",
		"inset-inline",
		"inset-block",
		"inset-inline-start",
		"inset-inline-end",
		"top",
		"right",
		"bottom",
		"left",
		"isolation",
		"z-index",
		"order",
		"grid-column",
		"grid-column-start",
		"grid-column-end",
		"grid-row",
		"grid-row-start",
		"grid-row-end",
		"float",
		"clear",
		"--tw-container-component",
		"margin",
		"margin-inline",
		"margin-block",
		"margin-inline-start",
		"margin-inline-end",
		"margin-top",
		"margin-right",
		"margin-bottom",
		"margin-left",
		"box-sizing",
		"display",
		"field-sizing",
		"aspect-ratio",
		"height",
		"max-height",
		"min-height",
		"width",
		"max-width",
		"min-width",
		"flex",
		"flex-shrink",
		"flex-grow",
		"flex-basis",
		"table-layout",
		"caption-side",
		"border-collapse",
		"border-spacing",
		"transform-origin",
		"translate",
		"--tw-translate-x",
		"--tw-translate-y",
		"--tw-translate-z",
		"scale",
		"--tw-scale-x",
		"--tw-scale-y",
		"--tw-scale-z",
		"rotate",
		"--tw-rotate-x",
		"--tw-rotate-y",
		"--tw-rotate-z",
		"--tw-skew-x",
		"--tw-skew-y",
		"transform",
		"animation",
		"cursor",
		"touch-action",
		"--tw-pan-x",
		"--tw-pan-y",
		"--tw-pinch-zoom",
		"resize",
		"scroll-snap-type",
		"--tw-scroll-snap-strictness",
		"scroll-snap-align",
		"scroll-snap-stop",
		"scroll-margin",
		"scroll-margin-inline",
		"scroll-margin-block",
		"scroll-margin-inline-start",
		"scroll-margin-inline-end",
		"scroll-margin-top",
		"scroll-margin-right",
		"scroll-margin-bottom",
		"scroll-margin-left",
		"scroll-padding",
		"scroll-padding-inline",
		"scroll-padding-block",
		"scroll-padding-inline-start",
		"scroll-padding-inline-end",
		"scroll-padding-top",
		"scroll-padding-right",
		"scroll-padding-bottom",
		"scroll-padding-left",
		"list-style-position",
		"list-style-type",
		"list-style-image",
		"appearance",
		"columns",
		"break-before",
		"break-inside",
		"break-after",
		"grid-auto-columns",
		"grid-auto-flow",
		"grid-auto-rows",
		"grid-template-columns",
		"grid-template-rows",
		"flex-direction",
		"flex-wrap",
		"place-content",
		"place-items",
		"align-content",
		"align-items",
		"justify-content",
		"justify-items",
		"gap",
		"column-gap",
		"row-gap",
		"--tw-space-x-reverse",
		"--tw-space-y-reverse",
		"divide-x-width",
		"divide-y-width",
		"--tw-divide-y-reverse",
		"divide-style",
		"divide-color",
		"place-self",
		"align-self",
		"justify-self",
		"overflow",
		"overflow-x",
		"overflow-y",
		"overscroll-behavior",
		"overscroll-behavior-x",
		"overscroll-behavior-y",
		"scroll-behavior",
		"border-radius",
		"border-start-radius",
		"border-end-radius",
		"border-top-radius",
		"border-right-radius",
		"border-bottom-radius",
		"border-left-radius",
		"border-start-start-radius",
		"border-start-end-radius",
		"border-end-end-radius",
		"border-end-start-radius",
		"border-top-left-radius",
		"border-top-right-radius",
		"border-bottom-right-radius",
		"border-bottom-left-radius",
		"border-width",
		"border-inline-width",
		"border-block-width",
		"border-inline-start-width",
		"border-inline-end-width",
		"border-top-width",
		"border-right-width",
		"border-bottom-width",
		"border-left-width",
		"border-style",
		"border-inline-style",
		"border-block-style",
		"border-inline-start-style",
		"border-inline-end-style",
		"border-top-style",
		"border-right-style",
		"border-bottom-style",
		"border-left-style",
		"border-color",
		"border-inline-color",
		"border-block-color",
		"border-inline-start-color",
		"border-inline-end-color",
		"border-top-color",
		"border-right-color",
		"border-bottom-color",
		"border-left-color",
		"background-color",
		"background-image",
		"--tw-gradient-position",
		"--tw-gradient-stops",
		"--tw-gradient-via-stops",
		"--tw-gradient-from",
		"--tw-gradient-from-position",
		"--tw-gradient-via",
		"--tw-gradient-via-position",
		"--tw-gradient-to",
		"--tw-gradient-to-position",
		"mask-image",
		"--tw-mask-top",
		"--tw-mask-top-from-color",
		"--tw-mask-top-from-position",
		"--tw-mask-top-to-color",
		"--tw-mask-top-to-position",
		"--tw-mask-right",
		"--tw-mask-right-from-color",
		"--tw-mask-right-from-position",
		"--tw-mask-right-to-color",
		"--tw-mask-right-to-position",
		"--tw-mask-bottom",
		"--tw-mask-bottom-from-color",
		"--tw-mask-bottom-from-position",
		"--tw-mask-bottom-to-color",
		"--tw-mask-bottom-to-position",
		"--tw-mask-left",
		"--tw-mask-left-from-color",
		"--tw-mask-left-from-position",
		"--tw-mask-left-to-color",
		"--tw-mask-left-to-position",
		"--tw-mask-linear",
		"--tw-mask-linear-position",
		"--tw-mask-linear-from-color",
		"--tw-mask-linear-from-position",
		"--tw-mask-linear-to-color",
		"--tw-mask-linear-to-position",
		"--tw-mask-radial",
		"--tw-mask-radial-shape",
		"--tw-mask-radial-size",
		"--tw-mask-radial-position",
		"--tw-mask-radial-from-color",
		"--tw-mask-radial-from-position",
		"--tw-mask-radial-to-color",
		"--tw-mask-radial-to-position",
		"--tw-mask-conic",
		"--tw-mask-conic-position",
		"--tw-mask-conic-from-color",
		"--tw-mask-conic-from-position",
		"--tw-mask-conic-to-color",
		"--tw-mask-conic-to-position",
		"box-decoration-break",
		"background-size",
		"background-attachment",
		"background-clip",
		"background-position",
		"background-repeat",
		"background-origin",
		"mask-composite",
		"mask-mode",
		"mask-type",
		"mask-size",
		"mask-clip",
		"mask-position",
		"mask-repeat",
		"mask-origin",
		"fill",
		"stroke",
		"stroke-width",
		"object-fit",
		"object-position",
		"padding",
		"padding-inline",
		"padding-block",
		"padding-inline-start",
		"padding-inline-end",
		"padding-top",
		"padding-right",
		"padding-bottom",
		"padding-left",
		"text-align",
		"text-indent",
		"vertical-align",
		"font-family",
		"font-size",
		"line-height",
		"font-weight",
		"letter-spacing",
		"text-wrap",
		"overflow-wrap",
		"word-break",
		"text-overflow",
		"hyphens",
		"white-space",
		"color",
		"text-transform",
		"font-style",
		"font-stretch",
		"font-variant-numeric",
		"text-decoration-line",
		"text-decoration-color",
		"text-decoration-style",
		"text-decoration-thickness",
		"text-underline-offset",
		"-webkit-font-smoothing",
		"placeholder-color",
		"caret-color",
		"accent-color",
		"color-scheme",
		"opacity",
		"background-blend-mode",
		"mix-blend-mode",
		"box-shadow",
		"--tw-shadow",
		"--tw-shadow-color",
		"--tw-ring-shadow",
		"--tw-ring-color",
		"--tw-inset-shadow",
		"--tw-inset-shadow-color",
		"--tw-inset-ring-shadow",
		"--tw-inset-ring-color",
		"--tw-ring-offset-width",
		"--tw-ring-offset-color",
		"outline",
		"outline-width",
		"outline-offset",
		"outline-color",
		"--tw-blur",
		"--tw-brightness",
		"--tw-contrast",
		"--tw-drop-shadow",
		"--tw-grayscale",
		"--tw-hue-rotate",
		"--tw-invert",
		"--tw-saturate",
		"--tw-sepia",
		"filter",
		"--tw-backdrop-blur",
		"--tw-backdrop-brightness",
		"--tw-backdrop-contrast",
		"--tw-backdrop-grayscale",
		"--tw-backdrop-hue-rotate",
		"--tw-backdrop-invert",
		"--tw-backdrop-opacity",
		"--tw-backdrop-saturate",
		"--tw-backdrop-sepia",
		"backdrop-filter",
		"transition-property",
		"transition-behavior",
		"transition-delay",
		"transition-duration",
		"transition-timing-function",
		"will-change",
		"contain",
		"content",
		"forced-color-adjust",
	]
	function pe(t, r, { onInvalidCandidate: o } = {}) {
		const e = new Map(),
			i = [],
			s = new Map()
		for (const d of t) {
			if (r.invalidCandidates.has(d)) {
				o?.(d)
				continue
			}
			const u = r.parseCandidate(d)
			if (u.length === 0) {
				o?.(d)
				continue
			}
			s.set(d, u)
		}
		const a = r.getVariantOrder()
		for (const [d, u] of s) {
			let c = !1
			for (const g of u) {
				const m = r.compileAstNodes(g)
				if (m.length !== 0) {
					c = !0
					for (const { node: h, propertySort: k } of m) {
						let v = 0n
						for (const A of g.variants) v |= 1n << BigInt(a.get(A))
						e.set(h, { properties: k, variants: v, candidate: d }), i.push(h)
					}
				}
			}
			c || o?.(d)
		}
		return (
			i.sort((d, u) => {
				const c = e.get(d),
					g = e.get(u)
				if (c.variants - g.variants !== 0n)
					return Number(c.variants - g.variants)
				let m = 0
				while (
					m < c.properties.order.length &&
					m < g.properties.order.length &&
					c.properties.order[m] === g.properties.order[m]
				)
					m += 1
				return (
					(c.properties.order[m] ?? 1 / 0) - (g.properties.order[m] ?? 1 / 0) ||
					g.properties.count - c.properties.count ||
					ot(c.candidate, g.candidate)
				)
			}),
			{ astNodes: i, nodeSorting: e }
		)
	}
	function Or(t, r) {
		const o = Ai(t, r)
		if (o.length === 0) return []
		const e = [],
			i = `.${ce(t.raw)}`
		for (const s of o) {
			const a = Ci(s)
			;(t.important || r.important) && _r(s)
			const d = { kind: "rule", selector: i, nodes: s }
			for (const u of t.variants) if (Se(d, u, r.variants) === null) return []
			e.push({ node: d, propertySort: a })
		}
		return e
	}
	function Se(t, r, o, e = 0) {
		if (r.kind === "arbitrary") {
			if (r.relative && e === 0) return null
			t.nodes = [M(r.selector, t.nodes)]
			return
		}
		const { applyFn: i } = o.get(r.root)
		if (r.kind === "compound") {
			const a = D("@slot")
			if (
				Se(a, r.variant, o, e + 1) === null ||
				(r.root === "not" && a.nodes.length > 1)
			)
				return null
			for (const u of a.nodes)
				if ((u.kind !== "rule" && u.kind !== "at-rule") || i(u, r) === null)
					return null
			j(a.nodes, (u) => {
				if ((u.kind === "rule" || u.kind === "at-rule") && u.nodes.length <= 0)
					return (u.nodes = t.nodes), 1
			}),
				(t.nodes = a.nodes)
			return
		}
		if (i(t, r) === null) return null
	}
	function Pr(t) {
		const r = t.options?.types ?? []
		return r.length > 1 && r.includes("any")
	}
	function Ai(t, r) {
		if (t.kind === "arbitrary") {
			let a = t.value
			return (
				t.modifier && (a = Q(a, t.modifier, r.theme)),
				a === null ? [] : [[l(t.property, a)]]
			)
		}
		const o = r.utilities.get(t.root) ?? [],
			e = [],
			i = o.filter((a) => !Pr(a))
		for (const a of i) {
			if (a.kind !== t.kind) continue
			const d = a.compileFn(t)
			if (d !== void 0) {
				if (d === null) return e
				e.push(d)
			}
		}
		if (e.length > 0) return e
		const s = o.filter((a) => Pr(a))
		for (const a of s) {
			if (a.kind !== t.kind) continue
			const d = a.compileFn(t)
			if (d !== void 0) {
				if (d === null) return e
				e.push(d)
			}
		}
		return e
	}
	function _r(t) {
		for (const r of t)
			r.kind !== "at-root" &&
				(r.kind === "declaration"
					? (r.important = !0)
					: (r.kind === "rule" || r.kind === "at-rule") && _r(r.nodes))
	}
	function Ci(t) {
		let r = new Set(),
			o = 0,
			e = t.slice(),
			i = !1
		while (e.length > 0) {
			const s = e.shift()
			if (s.kind === "declaration") {
				if (s.value === void 0 || (o++, i)) continue
				if (s.property === "--tw-sort") {
					const d = _t.indexOf(s.value ?? "")
					if (d !== -1) {
						r.add(d), (i = !0)
						continue
					}
				}
				const a = _t.indexOf(s.property)
				a !== -1 && r.add(a)
			} else if (s.kind === "rule" || s.kind === "at-rule")
				for (const a of s.nodes) e.push(a)
		}
		return { order: Array.from(r).sort((s, a) => s - a), count: o }
	}
	function ze(t, r) {
		let o = 0,
			e = M("&", t),
			i = new Set(),
			s = new q(() => new Set()),
			a = new q(() => new Set())
		j([e], (m, { parent: h }) => {
			if (m.kind === "at-rule") {
				if (m.name === "@keyframes")
					return (
						j(m.nodes, (k) => {
							if (k.kind === "at-rule" && k.name === "@apply")
								throw new Error("You cannot use `@apply` inside `@keyframes`.")
						}),
						1
					)
				if (m.name === "@utility") {
					const k = m.params.replace(/-\*$/, "")
					a.get(k).add(m),
						j(m.nodes, (v) => {
							if (!(v.kind !== "at-rule" || v.name !== "@apply")) {
								i.add(m)
								for (const A of Kr(v, r)) s.get(m).add(A)
							}
						})
					return
				}
				if (m.name === "@apply") {
					if (h === null) return
					;(o |= 1), i.add(h)
					for (const k of Kr(m, r)) s.get(h).add(k)
				}
			}
		})
		const d = new Set(),
			u = [],
			c = new Set()
		function g(m, h = []) {
			if (!d.has(m)) {
				if (c.has(m)) {
					const k = h[(h.indexOf(m) + 1) % h.length]
					throw (
						(m.kind === "at-rule" &&
							m.name === "@utility" &&
							k.kind === "at-rule" &&
							k.name === "@utility" &&
							j(m.nodes, (v) => {
								if (v.kind !== "at-rule" || v.name !== "@apply") return
								const A = v.params.split(/\s+/g)
								for (const y of A)
									for (const b of r.parseCandidate(y))
										switch (b.kind) {
											case "arbitrary":
												break
											case "static":
											case "functional":
												if (k.params.replace(/-\*$/, "") === b.root)
													throw new Error(
														`You cannot \`@apply\` the \`${y}\` utility here because it creates a circular dependency.`,
													)
												break
											default:
										}
							}),
						new Error(`Circular dependency detected:

${re([m])}
Relies on:

${re([k])}`))
					)
				}
				c.add(m)
				for (const k of s.get(m))
					for (const v of a.get(k)) h.push(m), g(v, h), h.pop()
				d.add(m), c.delete(m), u.push(m)
			}
		}
		for (const m of i) g(m)
		for (const m of u)
			if ("nodes" in m)
				for (let h = 0; h < m.nodes.length; h++) {
					const k = m.nodes[h]
					if (k.kind !== "at-rule" || k.name !== "@apply") continue
					const v = k.params.split(/\s+/g)
					{
						const A = pe(v, r, {
								onInvalidCandidate: (b) => {
									throw new Error(`Cannot apply unknown utility class: ${b}`)
								},
							}).astNodes,
							y = []
						for (const b of A)
							if (b.kind === "rule") for (const T of b.nodes) y.push(T)
							else y.push(b)
						m.nodes.splice(h, 1, ...y)
					}
				}
		return o
	}
	function* Kr(t, r) {
		for (const o of t.params.split(/\s+/g))
			for (const e of r.parseCandidate(o))
				switch (e.kind) {
					case "arbitrary":
						break
					case "static":
					case "functional":
						yield e.root
						break
					default:
				}
	}
	async function Kt(t, r, o, e = 0) {
		let i = 0,
			s = []
		return (
			j(t, (a, { replaceWith: d }) => {
				if (
					a.kind === "at-rule" &&
					(a.name === "@import" || a.name === "@reference")
				) {
					const u = Ni(H(a.params))
					if (u === null) return
					a.name === "@reference" && (u.media = "reference"), (i |= 2)
					const { uri: c, layer: g, media: m, supports: h } = u
					if (
						c.startsWith("data:") ||
						c.startsWith("http://") ||
						c.startsWith("https://")
					)
						return
					const k = ne({}, [])
					return (
						s.push(
							(async () => {
								if (e > 100)
									throw new Error(
										`Exceeded maximum recursion depth while resolving \`${c}\` in \`${r}\`)`,
									)
								const v = await o(c, r),
									A = Ae(v.content)
								await Kt(A, v.base, o, e + 1),
									(k.nodes = $i([ne({ base: v.base }, A)], g, m, h))
							})(),
						),
						d(k),
						1
					)
				}
			}),
			s.length > 0 && (await Promise.all(s)),
			i
		)
	}
	function Ni(t) {
		let r,
			o = null,
			e = null,
			i = null
		for (let s = 0; s < t.length; s++) {
			const a = t[s]
			if (a.kind !== "separator") {
				if (a.kind === "word" && !r) {
					if (!a.value || (a.value[0] !== '"' && a.value[0] !== "'"))
						return null
					r = a.value.slice(1, -1)
					continue
				}
				if ((a.kind === "function" && a.value.toLowerCase() === "url") || !r)
					return null
				if (
					(a.kind === "word" || a.kind === "function") &&
					a.value.toLowerCase() === "layer"
				) {
					if (o) return null
					if (i)
						throw new Error(
							"`layer(\u2026)` in an `@import` should come before any other functions or conditions",
						)
					"nodes" in a ? (o = J(a.nodes)) : (o = "")
					continue
				}
				if (a.kind === "function" && a.value.toLowerCase() === "supports") {
					if (i) return null
					i = J(a.nodes)
					continue
				}
				e = J(t.slice(s))
				break
			}
		}
		return r ? { uri: r, layer: o, media: e, supports: i } : null
	}
	function $i(t, r, o, e) {
		let i = t
		return (
			r !== null && (i = [D("@layer", r, i)]),
			o !== null && (i = [D("@media", o, i)]),
			e !== null && (i = [D("@supports", e[0] === "(" ? e : `(${e})`, i)]),
			i
		)
	}
	function Te(t, r = null) {
		return Array.isArray(t) &&
			t.length === 2 &&
			typeof t[1] == "object" &&
			typeof t[1] !== null
			? r
				? (t[1][r] ?? null)
				: t[0]
			: Array.isArray(t) && r === null
				? t.join(", ")
				: typeof t == "string" && r === null
					? t
					: null
	}
	function zr(t, { theme: r }, o) {
		for (const e of o) {
			const i = nt([e])
			i && t.theme.clearNamespace(`--${i}`, 4)
		}
		for (let [e, i] of Si(r)) {
			if (typeof i != "string" && typeof i != "number") continue
			if (
				(typeof i == "string" && (i = i.replace(/<alpha-value>/g, "1")),
				e[0] === "opacity" && (typeof i == "number" || typeof i == "string"))
			) {
				const a = typeof i == "string" ? Number.parseFloat(i) : i
				a >= 0 && a <= 1 && (i = a * 100 + "%")
			}
			const s = nt(e)
			s && t.theme.add(`--${s}`, "" + i, 7)
		}
		if (Object.hasOwn(r, "fontFamily")) {
			const e = 5
			{
				const i = Te(r.fontFamily.sans)
				i &&
					t.theme.hasDefault("--font-sans") &&
					(t.theme.add("--default-font-family", i, e),
					t.theme.add(
						"--default-font-feature-settings",
						Te(r.fontFamily.sans, "fontFeatureSettings") ?? "normal",
						e,
					),
					t.theme.add(
						"--default-font-variation-settings",
						Te(r.fontFamily.sans, "fontVariationSettings") ?? "normal",
						e,
					))
			}
			{
				const i = Te(r.fontFamily.mono)
				i &&
					t.theme.hasDefault("--font-mono") &&
					(t.theme.add("--default-mono-font-family", i, e),
					t.theme.add(
						"--default-mono-font-feature-settings",
						Te(r.fontFamily.mono, "fontFeatureSettings") ?? "normal",
						e,
					),
					t.theme.add(
						"--default-mono-font-variation-settings",
						Te(r.fontFamily.mono, "fontVariationSettings") ?? "normal",
						e,
					))
			}
		}
		return r
	}
	function Si(t) {
		const r = []
		return (
			Ur(t, [], (o, e) => {
				if (Vi(o)) return r.push([e, o]), 1
				if (Ei(o)) {
					r.push([e, o[0]])
					for (const i of Reflect.ownKeys(o[1]))
						r.push([[...e, `-${i}`], o[1][i]])
					return 1
				}
				if (Array.isArray(o) && o.every((i) => typeof i == "string"))
					return r.push([e, o.join(", ")]), 1
			}),
			r
		)
	}
	var Ti = /^[a-zA-Z0-9-_%/\.]+$/
	function nt(t) {
		if (t[0] === "container") return null
		;(t = structuredClone(t)),
			t[0] === "animation" && (t[0] = "animate"),
			t[0] === "aspectRatio" && (t[0] = "aspect"),
			t[0] === "borderRadius" && (t[0] = "radius"),
			t[0] === "boxShadow" && (t[0] = "shadow"),
			t[0] === "colors" && (t[0] = "color"),
			t[0] === "containers" && (t[0] = "container"),
			t[0] === "fontFamily" && (t[0] = "font"),
			t[0] === "fontSize" && (t[0] = "text"),
			t[0] === "letterSpacing" && (t[0] = "tracking"),
			t[0] === "lineHeight" && (t[0] = "leading"),
			t[0] === "maxWidth" && (t[0] = "container"),
			t[0] === "screens" && (t[0] = "breakpoint"),
			t[0] === "transitionTimingFunction" && (t[0] = "ease")
		for (const r of t) if (!Ti.test(r)) return null
		return t
			.map((r, o, e) => (r === "1" && o !== e.length - 1 ? "" : r))
			.map((r) =>
				r
					.replaceAll(".", "_")
					.replace(/([a-z])([A-Z])/g, (o, e, i) => `${e}-${i.toLowerCase()}`),
			)
			.filter((r, o) => r !== "DEFAULT" || o !== t.length - 1)
			.join("-")
	}
	function Vi(t) {
		return typeof t == "number" || typeof t == "string"
	}
	function Ei(t) {
		if (
			!Array.isArray(t) ||
			t.length !== 2 ||
			(typeof t[0] != "string" && typeof t[0] != "number") ||
			t[1] === void 0 ||
			t[1] === null ||
			typeof t[1] != "object"
		)
			return !1
		for (const r of Reflect.ownKeys(t[1]))
			if (
				typeof r != "string" ||
				(typeof t[1][r] != "string" && typeof t[1][r] != "number")
			)
				return !1
		return !0
	}
	function Ur(t, r = [], o) {
		for (const e of Reflect.ownKeys(t)) {
			const i = t[e]
			if (i == null) continue
			const s = [...r, e],
				a = o(i, s) ?? 0
			if (a !== 1) {
				if (a === 2) return 2
				if (!(!Array.isArray(i) && typeof i != "object") && Ur(i, s, o) === 2)
					return 2
			}
		}
	}
	function lt(t) {
		const r = []
		for (const o of K(t, ".")) {
			if (!o.includes("[")) {
				r.push(o)
				continue
			}
			let e = 0
			for (;;) {
				const i = o.indexOf("[", e),
					s = o.indexOf("]", i)
				if (i === -1 || s === -1) break
				i > e && r.push(o.slice(e, i)), r.push(o.slice(i + 1, s)), (e = s + 1)
			}
			e <= o.length - 1 && r.push(o.slice(e))
		}
		return r
	}
	function Ve(t) {
		if (Object.prototype.toString.call(t) !== "[object Object]") return !1
		const r = Object.getPrototypeOf(t)
		return r === null || Object.getPrototypeOf(r) === null
	}
	function Ue(t, r, o, e = []) {
		for (const i of r)
			if (i != null)
				for (const s of Reflect.ownKeys(i)) {
					e.push(s)
					const a = o(t[s], i[s], e)
					a !== void 0
						? (t[s] = a)
						: !Ve(t[s]) || !Ve(i[s])
							? (t[s] = i[s])
							: (t[s] = Ue({}, [t[s], i[s]], o, e)),
						e.pop()
				}
		return t
	}
	function at(t, r, o) {
		return (i, s) => {
			let a = i.lastIndexOf("/"),
				d = null
			a !== -1 && ((d = i.slice(a + 1).trim()), (i = i.slice(0, a).trim()))
			let u = (() => {
				let c = lt(i),
					[g, m] = Ri(t.theme, c),
					h = o(Dr(r() ?? {}, c) ?? null)
				if (
					(typeof h == "string" && (h = h.replace("<alpha-value>", "1")),
					typeof g != "object")
				)
					return typeof m != "object" && m & 4 ? (h ?? g) : g
				if (h !== null && typeof h == "object" && !Array.isArray(h)) {
					const k = Ue({}, [h], (v, A) => A)
					if (g === null && Object.hasOwn(h, "__CSS_VALUES__")) {
						const v = {}
						for (const A in h.__CSS_VALUES__) (v[A] = h[A]), delete k[A]
						g = v
					}
					for (const v in g)
						v !== "__CSS_VALUES__" &&
							((h?.__CSS_VALUES__?.[v] & 4 && Dr(k, v.split("-")) !== void 0) ||
								(k[he(v)] = g[v]))
					return k
				}
				if (Array.isArray(g) && Array.isArray(m) && Array.isArray(h)) {
					let k = g[0],
						v = g[1]
					m[0] & 4 && (k = h[0] ?? k)
					for (const A of Object.keys(v))
						m[1][A] & 4 && (v[A] = h[1][A] ?? v[A])
					return [k, v]
				}
				return g ?? h
			})()
			return d && typeof u == "string" && (u = Y(u, d)), u ?? s
		}
	}
	function Ri(t, r) {
		if (r.length === 1 && r[0].startsWith("--"))
			return [t.get([r[0]]), t.getOptions(r[0])]
		const o = nt(r),
			e = new Map(),
			i = new q(() => new Map()),
			s = t.namespace(`--${o}`)
		if (s.size === 0) return [null, 0]
		const a = new Map()
		for (const [g, m] of s) {
			if (!g || !g.includes("--")) {
				e.set(g, m), a.set(g, t.getOptions(g ? `--${o}-${g}` : `--${o}`))
				continue
			}
			let h = g.indexOf("--"),
				k = g.slice(0, h),
				v = g.slice(h + 2)
			;(v = v.replace(/-([a-z])/g, (A, y) => y.toUpperCase())),
				i.get(k === "" ? null : k).set(v, [m, t.getOptions(`--${o}${g}`)])
		}
		const d = t.getOptions(`--${o}`)
		for (const [g, m] of i) {
			const h = e.get(g)
			if (typeof h != "string") continue
			const k = {},
				v = {}
			for (const [A, [y, b]] of m) (k[A] = y), (v[A] = b)
			e.set(g, [h, k]), a.set(g, [d, v])
		}
		const u = {},
			c = {}
		for (const [g, m] of e) jr(u, [g ?? "DEFAULT"], m)
		for (const [g, m] of a) jr(c, [g ?? "DEFAULT"], m)
		return r[r.length - 1] === "DEFAULT"
			? [u?.DEFAULT ?? null, c.DEFAULT ?? 0]
			: "DEFAULT" in u && Object.keys(u).length === 1
				? [u.DEFAULT, c.DEFAULT ?? 0]
				: ((u.__CSS_VALUES__ = c), [u, c])
	}
	function Dr(t, r) {
		for (let o = 0; o < r.length; ++o) {
			const e = r[o]
			if (t?.[e] === void 0) {
				if (r[o + 1] === void 0) return
				r[o + 1] = `${e}-${r[o + 1]}`
				continue
			}
			t = t[e]
		}
		return t
	}
	function jr(t, r, o) {
		for (const e of r.slice(0, -1)) t[e] === void 0 && (t[e] = {}), (t = t[e])
		t[r[r.length - 1]] = o
	}
	function Oi(t) {
		return { kind: "combinator", value: t }
	}
	function Pi(t, r) {
		return { kind: "function", value: t, nodes: r }
	}
	function De(t) {
		return { kind: "selector", value: t }
	}
	function _i(t) {
		return { kind: "separator", value: t }
	}
	function Ki(t) {
		return { kind: "value", value: t }
	}
	function je(t, r, o = null) {
		for (let e = 0; e < t.length; e++) {
			let i = t[e],
				s = !1,
				a = 0,
				d =
					r(i, {
						parent: o,
						replaceWith(u) {
							s ||
								((s = !0),
								Array.isArray(u)
									? u.length === 0
										? (t.splice(e, 1), (a = 0))
										: u.length === 1
											? ((t[e] = u[0]), (a = 1))
											: (t.splice(e, 1, ...u), (a = u.length))
									: ((t[e] = u), (a = 1)))
						},
					}) ?? 0
			if (s) {
				d === 0 ? e-- : (e += a - 1)
				continue
			}
			if (d === 2) return 2
			if (d !== 1 && i.kind === "function" && je(i.nodes, r, i) === 2) return 2
		}
	}
	function Ie(t) {
		let r = ""
		for (const o of t)
			switch (o.kind) {
				case "combinator":
				case "selector":
				case "separator":
				case "value": {
					r += o.value
					break
				}
				case "function":
					r += o.value + "(" + Ie(o.nodes) + ")"
			}
		return r
	}
	var Ir = 92,
		zi = 93,
		Fr = 41,
		Ui = 58,
		Lr = 44,
		Di = 34,
		ji = 46,
		Mr = 62,
		Br = 10,
		Ii = 35,
		Wr = 91,
		qr = 40,
		Hr = 43,
		Fi = 39,
		Gr = 32,
		Yr = 9,
		Jr = 126
	function st(t) {
		t = t.replaceAll(
			`\r
`,
			`
`,
		)
		let r = [],
			o = [],
			e = null,
			i = "",
			s
		for (let a = 0; a < t.length; a++) {
			const d = t.charCodeAt(a)
			switch (d) {
				case Lr:
				case Mr:
				case Br:
				case Gr:
				case Hr:
				case Yr:
				case Jr: {
					if (i.length > 0) {
						const h = De(i)
						e ? e.nodes.push(h) : r.push(h), (i = "")
					}
					let u = a,
						c = a + 1
					for (
						;
						c < t.length &&
						((s = t.charCodeAt(c)),
						!(
							s !== Lr &&
							s !== Mr &&
							s !== Br &&
							s !== Gr &&
							s !== Hr &&
							s !== Yr &&
							s !== Jr
						));
						c++
					);
					a = c - 1
					const g = t.slice(u, c),
						m = g.trim() === "," ? _i(g) : Oi(g)
					e ? e.nodes.push(m) : r.push(m)
					break
				}
				case qr: {
					const u = Pi(i, [])
					if (
						((i = ""),
						u.value !== ":not" &&
							u.value !== ":where" &&
							u.value !== ":has" &&
							u.value !== ":is")
					) {
						let c = a + 1,
							g = 0
						for (let h = a + 1; h < t.length; h++) {
							if (((s = t.charCodeAt(h)), s === qr)) {
								g++
								continue
							}
							if (s === Fr) {
								if (g === 0) {
									a = h
									break
								}
								g--
							}
						}
						const m = a
						u.nodes.push(Ki(t.slice(c, m))),
							(i = ""),
							(a = m),
							e ? e.nodes.push(u) : r.push(u)
						break
					}
					e ? e.nodes.push(u) : r.push(u), o.push(u), (e = u)
					break
				}
				case Fr: {
					const u = o.pop()
					if (i.length > 0) {
						const c = De(i)
						u.nodes.push(c), (i = "")
					}
					o.length > 0 ? (e = o[o.length - 1]) : (e = null)
					break
				}
				case ji:
				case Ui:
				case Ii: {
					if (i.length > 0) {
						const u = De(i)
						e ? e.nodes.push(u) : r.push(u)
					}
					i = String.fromCharCode(d)
					break
				}
				case Wr: {
					if (i.length > 0) {
						const g = De(i)
						e ? e.nodes.push(g) : r.push(g)
					}
					i = ""
					let u = a,
						c = 0
					for (let g = a + 1; g < t.length; g++) {
						if (((s = t.charCodeAt(g)), s === Wr)) {
							c++
							continue
						}
						if (s === zi) {
							if (c === 0) {
								a = g
								break
							}
							c--
						}
					}
					i += t.slice(u, a + 1)
					break
				}
				case Fi:
				case Di: {
					const u = a
					for (let c = a + 1; c < t.length; c++)
						if (((s = t.charCodeAt(c)), s === Ir)) c += 1
						else if (s === d) {
							a = c
							break
						}
					i += t.slice(u, a + 1)
					break
				}
				case Ir: {
					const u = t.charCodeAt(a + 1)
					;(i += String.fromCharCode(d) + String.fromCharCode(u)), (a += 1)
					break
				}
				default:
					i += String.fromCharCode(d)
			}
		}
		return i.length > 0 && r.push(De(i)), r
	}
	var Qr = /^[a-z@][a-zA-Z0-9/%._-]*$/
	function zt({
		designSystem: t,
		ast: r,
		resolvedConfig: o,
		featuresRef: e,
		referenceMode: i,
	}) {
		const s = {
			addBase(a) {
				if (i) return
				const d = le(a)
				;(e.current |= $e(d, t)), r.push(D("@layer", "base", d))
			},
			addVariant(a, d) {
				if (!it.test(a))
					throw new Error(
						`\`addVariant('${a}')\` defines an invalid variant name. Variants should only contain alphanumeric, dashes or underscore characters.`,
					)
				typeof d == "string" || Array.isArray(d)
					? t.variants.static(
							a,
							(u) => {
								u.nodes = Zr(d, u.nodes)
							},
							{ compounds: be(typeof d == "string" ? [d] : d) },
						)
					: typeof d == "object" && t.variants.fromAst(a, le(d))
			},
			matchVariant(a, d, u) {
				function c(m, h, k) {
					const v = d(m, { modifier: h?.value ?? null })
					return Zr(v, k)
				}
				const g = Object.keys(u?.values ?? {})
				t.variants.group(
					() => {
						t.variants.functional(a, (m, h) => {
							if (!h.value) {
								if (u?.values && "DEFAULT" in u.values) {
									m.nodes = c(u.values.DEFAULT, h.modifier, m.nodes)
									return
								}
								return null
							}
							if (h.value.kind === "arbitrary")
								m.nodes = c(h.value.value, h.modifier, m.nodes)
							else if (h.value.kind === "named" && u?.values) {
								const k = u.values[h.value.value]
								if (typeof k != "string") return
								m.nodes = c(k, h.modifier, m.nodes)
							}
						})
					},
					(m, h) => {
						if (m.kind !== "functional" || h.kind !== "functional") return 0
						const k = m.value ? m.value.value : "DEFAULT",
							v = h.value ? h.value.value : "DEFAULT",
							A = u?.values?.[k] ?? k,
							y = u?.values?.[v] ?? v
						if (u && typeof u.sort == "function")
							return u.sort(
								{ value: A, modifier: m.modifier?.value ?? null },
								{ value: y, modifier: h.modifier?.value ?? null },
							)
						let b = g.indexOf(k),
							T = g.indexOf(v)
						return (
							(b = b === -1 ? g.length : b),
							(T = T === -1 ? g.length : T),
							b !== T ? b - T : A < y ? -1 : 1
						)
					},
				)
			},
			addUtilities(a) {
				a = Array.isArray(a) ? a : [a]
				let d = a.flatMap((c) => Object.entries(c))
				d = d.flatMap(([c, g]) => K(c, ",").map((m) => [m.trim(), g]))
				const u = new q(() => [])
				for (const [c, g] of d) {
					if (c.startsWith("@keyframes ")) {
						i || r.push(M(c, le(g)))
						continue
					}
					let m = st(c),
						h = !1
					if (
						(je(m, (k) => {
							if (
								k.kind === "selector" &&
								k.value[0] === "." &&
								Qr.test(k.value.slice(1))
							) {
								const v = k.value
								k.value = "&"
								const A = Ie(m),
									y = v.slice(1),
									b = A === "&" ? le(g) : [M(A, le(g))]
								u.get(y).push(...b), (h = !0), (k.value = v)
								return
							}
							if (k.kind === "function" && k.value === ":not") return 1
						}),
						!h)
					)
						throw new Error(
							`\`addUtilities({ '${c}' : \u2026 })\` defines an invalid utility selector. Utilities must be a single class name and start with a lowercase letter, eg. \`.scrollbar-none\`.`,
						)
				}
				for (const [c, g] of u)
					t.theme.prefix &&
						j(g, (m) => {
							if (m.kind === "rule") {
								const h = st(m.selector)
								je(h, (k) => {
									k.kind === "selector" &&
										k.value[0] === "." &&
										(k.value = `.${t.theme.prefix}\\:${k.value.slice(1)}`)
								}),
									(m.selector = Ie(h))
							}
						}),
						t.utilities.static(c, (m) => {
							const h = structuredClone(g)
							return Xr(h, c, m.raw), (e.current |= ze(h, t)), h
						})
			},
			matchUtilities(a, d) {
				const u = d?.type
					? Array.isArray(d?.type)
						? d.type
						: [d.type]
					: ["any"]
				for (const [g, m] of Object.entries(a)) {
					const h =
						({ negative: k }) =>
						(v) => {
							if (
								v.value?.kind === "arbitrary" &&
								u.length > 0 &&
								!u.includes("any") &&
								((v.value.dataType && !u.includes(v.value.dataType)) ||
									(!v.value.dataType && !B(v.value.value, u)))
							)
								return
							let A = u.includes("color"),
								y = null,
								b = !1
							{
								let P = d?.values ?? {}
								A &&
									(P = Object.assign(
										{
											inherit: "inherit",
											transparent: "transparent",
											current: "currentcolor",
										},
										P,
									)),
									v.value
										? v.value.kind === "arbitrary"
											? (y = v.value.value)
											: v.value.fraction && P[v.value.fraction]
												? ((y = P[v.value.fraction]), (b = !0))
												: P[v.value.value]
													? (y = P[v.value.value])
													: P.__BARE_VALUE__ &&
														((y = P.__BARE_VALUE__(v.value) ?? null),
														(b =
															(v.value.fraction !== null && y?.includes("/")) ??
															!1))
										: (y = P.DEFAULT ?? null)
							}
							if (y === null) return
							let T
							{
								const P = d?.modifiers ?? null
								v.modifier
									? P === "any" || v.modifier.kind === "arbitrary"
										? (T = v.modifier.value)
										: P?.[v.modifier.value]
											? (T = P[v.modifier.value])
											: A && !Number.isNaN(Number(v.modifier.value))
												? (T = `${v.modifier.value}%`)
												: (T = null)
									: (T = null)
							}
							if (v.modifier && T === null && !b)
								return v.value?.kind === "arbitrary" ? null : void 0
							A && T !== null && (y = Y(y, T)), k && (y = `calc(${y} * -1)`)
							const E = le(m(y, { modifier: T }))
							return Xr(E, g, v.raw), (e.current |= ze(E, t)), E
						}
					var c = h
					if (!Qr.test(g))
						throw new Error(
							`\`matchUtilities({ '${g}' : \u2026 })\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter, eg. \`scrollbar\`.`,
						)
					d?.supportsNegativeValues &&
						t.utilities.functional(`-${g}`, h({ negative: !0 }), { types: u }),
						t.utilities.functional(g, h({ negative: !1 }), { types: u }),
						t.utilities.suggest(g, () => {
							const k = d?.values ?? {},
								v = new Set(Object.keys(k))
							v.delete("__BARE_VALUE__"),
								v.has("DEFAULT") && (v.delete("DEFAULT"), v.add(null))
							const A = d?.modifiers ?? {},
								y = A === "any" ? [] : Object.keys(A)
							return [
								{
									supportsNegative: d?.supportsNegativeValues ?? !1,
									values: Array.from(v),
									modifiers: y,
								},
							]
						})
				}
			},
			addComponents(a, d) {
				this.addUtilities(a, d)
			},
			matchComponents(a, d) {
				this.matchUtilities(a, d)
			},
			theme: at(
				t,
				() => o.theme ?? {},
				(a) => a,
			),
			prefix(a) {
				return a
			},
			config(a, d) {
				let u = o
				if (!a) return u
				const c = lt(a)
				for (let g = 0; g < c.length; ++g) {
					const m = c[g]
					if (u[m] === void 0) return d
					u = u[m]
				}
				return u ?? d
			},
		}
		return (
			(s.addComponents = s.addComponents.bind(s)),
			(s.matchComponents = s.matchComponents.bind(s)),
			s
		)
	}
	function le(t) {
		const r = []
		t = Array.isArray(t) ? t : [t]
		const o = t.flatMap((e) => Object.entries(e))
		for (let [e, i] of o)
			if (typeof i != "object") {
				if (!e.startsWith("--")) {
					if (i === "@slot") {
						r.push(M(e, [D("@slot")]))
						continue
					}
					e = e.replace(/([A-Z])/g, "-$1").toLowerCase()
				}
				r.push(l(e, String(i)))
			} else if (Array.isArray(i))
				for (const s of i)
					typeof s == "string" ? r.push(l(e, s)) : r.push(M(e, le(s)))
			else i !== null && r.push(M(e, le(i)))
		return r
	}
	function Zr(t, r) {
		return (typeof t == "string" ? [t] : t).flatMap((e) => {
			if (e.trim().endsWith("}")) {
				const i = e.replace("}", "{@slot}}"),
					s = Ae(i)
				return Pt(s, r), s
			} else return M(e, r)
		})
	}
	function Xr(t, r, o) {
		j(t, (e) => {
			if (e.kind === "rule") {
				const i = st(e.selector)
				je(i, (s) => {
					s.kind === "selector" &&
						s.value === `.${r}` &&
						(s.value = `.${ce(o)}`)
				}),
					(e.selector = Ie(i))
			}
		})
	}
	function eo(t, r, o) {
		for (const e of Mi(r)) t.theme.addKeyframes(e)
	}
	function Mi(t) {
		const r = []
		if ("keyframes" in t.theme)
			for (const [o, e] of Object.entries(t.theme.keyframes))
				r.push(D("@keyframes", o, le(e)))
		return r
	}
	var ut = {
		inherit: "inherit",
		current: "currentcolor",
		transparent: "transparent",
		black: "#000",
		white: "#fff",
		slate: {
			50: "oklch(98.4% 0.003 247.858)",
			100: "oklch(96.8% 0.007 247.896)",
			200: "oklch(92.9% 0.013 255.508)",
			300: "oklch(86.9% 0.022 252.894)",
			400: "oklch(70.4% 0.04 256.788)",
			500: "oklch(55.4% 0.046 257.417)",
			600: "oklch(44.6% 0.043 257.281)",
			700: "oklch(37.2% 0.044 257.287)",
			800: "oklch(27.9% 0.041 260.031)",
			900: "oklch(20.8% 0.042 265.755)",
			950: "oklch(12.9% 0.042 264.695)",
		},
		gray: {
			50: "oklch(98.5% 0.002 247.839)",
			100: "oklch(96.7% 0.003 264.542)",
			200: "oklch(92.8% 0.006 264.531)",
			300: "oklch(87.2% 0.01 258.338)",
			400: "oklch(70.7% 0.022 261.325)",
			500: "oklch(55.1% 0.027 264.364)",
			600: "oklch(44.6% 0.03 256.802)",
			700: "oklch(37.3% 0.034 259.733)",
			800: "oklch(27.8% 0.033 256.848)",
			900: "oklch(21% 0.034 264.665)",
			950: "oklch(13% 0.028 261.692)",
		},
		zinc: {
			50: "oklch(98.5% 0 0)",
			100: "oklch(96.7% 0.001 286.375)",
			200: "oklch(92% 0.004 286.32)",
			300: "oklch(87.1% 0.006 286.286)",
			400: "oklch(70.5% 0.015 286.067)",
			500: "oklch(55.2% 0.016 285.938)",
			600: "oklch(44.2% 0.017 285.786)",
			700: "oklch(37% 0.013 285.805)",
			800: "oklch(27.4% 0.006 286.033)",
			900: "oklch(21% 0.006 285.885)",
			950: "oklch(14.1% 0.005 285.823)",
		},
		neutral: {
			50: "oklch(98.5% 0 0)",
			100: "oklch(97% 0 0)",
			200: "oklch(92.2% 0 0)",
			300: "oklch(87% 0 0)",
			400: "oklch(70.8% 0 0)",
			500: "oklch(55.6% 0 0)",
			600: "oklch(43.9% 0 0)",
			700: "oklch(37.1% 0 0)",
			800: "oklch(26.9% 0 0)",
			900: "oklch(20.5% 0 0)",
			950: "oklch(14.5% 0 0)",
		},
		stone: {
			50: "oklch(98.5% 0.001 106.423)",
			100: "oklch(97% 0.001 106.424)",
			200: "oklch(92.3% 0.003 48.717)",
			300: "oklch(86.9% 0.005 56.366)",
			400: "oklch(70.9% 0.01 56.259)",
			500: "oklch(55.3% 0.013 58.071)",
			600: "oklch(44.4% 0.011 73.639)",
			700: "oklch(37.4% 0.01 67.558)",
			800: "oklch(26.8% 0.007 34.298)",
			900: "oklch(21.6% 0.006 56.043)",
			950: "oklch(14.7% 0.004 49.25)",
		},
		red: {
			50: "oklch(97.1% 0.013 17.38)",
			100: "oklch(93.6% 0.032 17.717)",
			200: "oklch(88.5% 0.062 18.334)",
			300: "oklch(80.8% 0.114 19.571)",
			400: "oklch(70.4% 0.191 22.216)",
			500: "oklch(63.7% 0.237 25.331)",
			600: "oklch(57.7% 0.245 27.325)",
			700: "oklch(50.5% 0.213 27.518)",
			800: "oklch(44.4% 0.177 26.899)",
			900: "oklch(39.6% 0.141 25.723)",
			950: "oklch(25.8% 0.092 26.042)",
		},
		orange: {
			50: "oklch(98% 0.016 73.684)",
			100: "oklch(95.4% 0.038 75.164)",
			200: "oklch(90.1% 0.076 70.697)",
			300: "oklch(83.7% 0.128 66.29)",
			400: "oklch(75% 0.183 55.934)",
			500: "oklch(70.5% 0.213 47.604)",
			600: "oklch(64.6% 0.222 41.116)",
			700: "oklch(55.3% 0.195 38.402)",
			800: "oklch(47% 0.157 37.304)",
			900: "oklch(40.8% 0.123 38.172)",
			950: "oklch(26.6% 0.079 36.259)",
		},
		amber: {
			50: "oklch(98.7% 0.022 95.277)",
			100: "oklch(96.2% 0.059 95.617)",
			200: "oklch(92.4% 0.12 95.746)",
			300: "oklch(87.9% 0.169 91.605)",
			400: "oklch(82.8% 0.189 84.429)",
			500: "oklch(76.9% 0.188 70.08)",
			600: "oklch(66.6% 0.179 58.318)",
			700: "oklch(55.5% 0.163 48.998)",
			800: "oklch(47.3% 0.137 46.201)",
			900: "oklch(41.4% 0.112 45.904)",
			950: "oklch(27.9% 0.077 45.635)",
		},
		yellow: {
			50: "oklch(98.7% 0.026 102.212)",
			100: "oklch(97.3% 0.071 103.193)",
			200: "oklch(94.5% 0.129 101.54)",
			300: "oklch(90.5% 0.182 98.111)",
			400: "oklch(85.2% 0.199 91.936)",
			500: "oklch(79.5% 0.184 86.047)",
			600: "oklch(68.1% 0.162 75.834)",
			700: "oklch(55.4% 0.135 66.442)",
			800: "oklch(47.6% 0.114 61.907)",
			900: "oklch(42.1% 0.095 57.708)",
			950: "oklch(28.6% 0.066 53.813)",
		},
		lime: {
			50: "oklch(98.6% 0.031 120.757)",
			100: "oklch(96.7% 0.067 122.328)",
			200: "oklch(93.8% 0.127 124.321)",
			300: "oklch(89.7% 0.196 126.665)",
			400: "oklch(84.1% 0.238 128.85)",
			500: "oklch(76.8% 0.233 130.85)",
			600: "oklch(64.8% 0.2 131.684)",
			700: "oklch(53.2% 0.157 131.589)",
			800: "oklch(45.3% 0.124 130.933)",
			900: "oklch(40.5% 0.101 131.063)",
			950: "oklch(27.4% 0.072 132.109)",
		},
		green: {
			50: "oklch(98.2% 0.018 155.826)",
			100: "oklch(96.2% 0.044 156.743)",
			200: "oklch(92.5% 0.084 155.995)",
			300: "oklch(87.1% 0.15 154.449)",
			400: "oklch(79.2% 0.209 151.711)",
			500: "oklch(72.3% 0.219 149.579)",
			600: "oklch(62.7% 0.194 149.214)",
			700: "oklch(52.7% 0.154 150.069)",
			800: "oklch(44.8% 0.119 151.328)",
			900: "oklch(39.3% 0.095 152.535)",
			950: "oklch(26.6% 0.065 152.934)",
		},
		emerald: {
			50: "oklch(97.9% 0.021 166.113)",
			100: "oklch(95% 0.052 163.051)",
			200: "oklch(90.5% 0.093 164.15)",
			300: "oklch(84.5% 0.143 164.978)",
			400: "oklch(76.5% 0.177 163.223)",
			500: "oklch(69.6% 0.17 162.48)",
			600: "oklch(59.6% 0.145 163.225)",
			700: "oklch(50.8% 0.118 165.612)",
			800: "oklch(43.2% 0.095 166.913)",
			900: "oklch(37.8% 0.077 168.94)",
			950: "oklch(26.2% 0.051 172.552)",
		},
		teal: {
			50: "oklch(98.4% 0.014 180.72)",
			100: "oklch(95.3% 0.051 180.801)",
			200: "oklch(91% 0.096 180.426)",
			300: "oklch(85.5% 0.138 181.071)",
			400: "oklch(77.7% 0.152 181.912)",
			500: "oklch(70.4% 0.14 182.503)",
			600: "oklch(60% 0.118 184.704)",
			700: "oklch(51.1% 0.096 186.391)",
			800: "oklch(43.7% 0.078 188.216)",
			900: "oklch(38.6% 0.063 188.416)",
			950: "oklch(27.7% 0.046 192.524)",
		},
		cyan: {
			50: "oklch(98.4% 0.019 200.873)",
			100: "oklch(95.6% 0.045 203.388)",
			200: "oklch(91.7% 0.08 205.041)",
			300: "oklch(86.5% 0.127 207.078)",
			400: "oklch(78.9% 0.154 211.53)",
			500: "oklch(71.5% 0.143 215.221)",
			600: "oklch(60.9% 0.126 221.723)",
			700: "oklch(52% 0.105 223.128)",
			800: "oklch(45% 0.085 224.283)",
			900: "oklch(39.8% 0.07 227.392)",
			950: "oklch(30.2% 0.056 229.695)",
		},
		sky: {
			50: "oklch(97.7% 0.013 236.62)",
			100: "oklch(95.1% 0.026 236.824)",
			200: "oklch(90.1% 0.058 230.902)",
			300: "oklch(82.8% 0.111 230.318)",
			400: "oklch(74.6% 0.16 232.661)",
			500: "oklch(68.5% 0.169 237.323)",
			600: "oklch(58.8% 0.158 241.966)",
			700: "oklch(50% 0.134 242.749)",
			800: "oklch(44.3% 0.11 240.79)",
			900: "oklch(39.1% 0.09 240.876)",
			950: "oklch(29.3% 0.066 243.157)",
		},
		blue: {
			50: "oklch(97% 0.014 254.604)",
			100: "oklch(93.2% 0.032 255.585)",
			200: "oklch(88.2% 0.059 254.128)",
			300: "oklch(80.9% 0.105 251.813)",
			400: "oklch(70.7% 0.165 254.624)",
			500: "oklch(62.3% 0.214 259.815)",
			600: "oklch(54.6% 0.245 262.881)",
			700: "oklch(48.8% 0.243 264.376)",
			800: "oklch(42.4% 0.199 265.638)",
			900: "oklch(37.9% 0.146 265.522)",
			950: "oklch(28.2% 0.091 267.935)",
		},
		indigo: {
			50: "oklch(96.2% 0.018 272.314)",
			100: "oklch(93% 0.034 272.788)",
			200: "oklch(87% 0.065 274.039)",
			300: "oklch(78.5% 0.115 274.713)",
			400: "oklch(67.3% 0.182 276.935)",
			500: "oklch(58.5% 0.233 277.117)",
			600: "oklch(51.1% 0.262 276.966)",
			700: "oklch(45.7% 0.24 277.023)",
			800: "oklch(39.8% 0.195 277.366)",
			900: "oklch(35.9% 0.144 278.697)",
			950: "oklch(25.7% 0.09 281.288)",
		},
		violet: {
			50: "oklch(96.9% 0.016 293.756)",
			100: "oklch(94.3% 0.029 294.588)",
			200: "oklch(89.4% 0.057 293.283)",
			300: "oklch(81.1% 0.111 293.571)",
			400: "oklch(70.2% 0.183 293.541)",
			500: "oklch(60.6% 0.25 292.717)",
			600: "oklch(54.1% 0.281 293.009)",
			700: "oklch(49.1% 0.27 292.581)",
			800: "oklch(43.2% 0.232 292.759)",
			900: "oklch(38% 0.189 293.745)",
			950: "oklch(28.3% 0.141 291.089)",
		},
		purple: {
			50: "oklch(97.7% 0.014 308.299)",
			100: "oklch(94.6% 0.033 307.174)",
			200: "oklch(90.2% 0.063 306.703)",
			300: "oklch(82.7% 0.119 306.383)",
			400: "oklch(71.4% 0.203 305.504)",
			500: "oklch(62.7% 0.265 303.9)",
			600: "oklch(55.8% 0.288 302.321)",
			700: "oklch(49.6% 0.265 301.924)",
			800: "oklch(43.8% 0.218 303.724)",
			900: "oklch(38.1% 0.176 304.987)",
			950: "oklch(29.1% 0.149 302.717)",
		},
		fuchsia: {
			50: "oklch(97.7% 0.017 320.058)",
			100: "oklch(95.2% 0.037 318.852)",
			200: "oklch(90.3% 0.076 319.62)",
			300: "oklch(83.3% 0.145 321.434)",
			400: "oklch(74% 0.238 322.16)",
			500: "oklch(66.7% 0.295 322.15)",
			600: "oklch(59.1% 0.293 322.896)",
			700: "oklch(51.8% 0.253 323.949)",
			800: "oklch(45.2% 0.211 324.591)",
			900: "oklch(40.1% 0.17 325.612)",
			950: "oklch(29.3% 0.136 325.661)",
		},
		pink: {
			50: "oklch(97.1% 0.014 343.198)",
			100: "oklch(94.8% 0.028 342.258)",
			200: "oklch(89.9% 0.061 343.231)",
			300: "oklch(82.3% 0.12 346.018)",
			400: "oklch(71.8% 0.202 349.761)",
			500: "oklch(65.6% 0.241 354.308)",
			600: "oklch(59.2% 0.249 0.584)",
			700: "oklch(52.5% 0.223 3.958)",
			800: "oklch(45.9% 0.187 3.815)",
			900: "oklch(40.8% 0.153 2.432)",
			950: "oklch(28.4% 0.109 3.907)",
		},
		rose: {
			50: "oklch(96.9% 0.015 12.422)",
			100: "oklch(94.1% 0.03 12.58)",
			200: "oklch(89.2% 0.058 10.001)",
			300: "oklch(81% 0.117 11.638)",
			400: "oklch(71.2% 0.194 13.428)",
			500: "oklch(64.5% 0.246 16.439)",
			600: "oklch(58.6% 0.253 17.585)",
			700: "oklch(51.4% 0.222 16.935)",
			800: "oklch(45.5% 0.188 13.697)",
			900: "oklch(41% 0.159 10.272)",
			950: "oklch(27.1% 0.105 12.094)",
		},
	}
	function ye(t) {
		return { __BARE_VALUE__: t }
	}
	var oe = ye((t) => {
			if (V(t.value)) return t.value
		}),
		ee = ye((t) => {
			if (V(t.value)) return `${t.value}%`
		}),
		me = ye((t) => {
			if (V(t.value)) return `${t.value}px`
		}),
		to = ye((t) => {
			if (V(t.value)) return `${t.value}ms`
		}),
		ct = ye((t) => {
			if (V(t.value)) return `${t.value}deg`
		}),
		Bi = ye((t) => {
			if (t.fraction === null) return
			const [r, o] = K(t.fraction, "/")
			if (!(!V(r) || !V(o))) return t.fraction
		}),
		ro = ye((t) => {
			if (V(Number(t.value))) return `repeat(${t.value}, minmax(0, 1fr))`
		}),
		oo = {
			accentColor: ({ theme: t }) => t("colors"),
			animation: {
				none: "none",
				spin: "spin 1s linear infinite",
				ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
				pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				bounce: "bounce 1s infinite",
			},
			aria: {
				busy: 'busy="true"',
				checked: 'checked="true"',
				disabled: 'disabled="true"',
				expanded: 'expanded="true"',
				hidden: 'hidden="true"',
				pressed: 'pressed="true"',
				readonly: 'readonly="true"',
				required: 'required="true"',
				selected: 'selected="true"',
			},
			aspectRatio: { auto: "auto", square: "1 / 1", video: "16 / 9", ...Bi },
			backdropBlur: ({ theme: t }) => t("blur"),
			backdropBrightness: ({ theme: t }) => ({ ...t("brightness"), ...ee }),
			backdropContrast: ({ theme: t }) => ({ ...t("contrast"), ...ee }),
			backdropGrayscale: ({ theme: t }) => ({ ...t("grayscale"), ...ee }),
			backdropHueRotate: ({ theme: t }) => ({ ...t("hueRotate"), ...ct }),
			backdropInvert: ({ theme: t }) => ({ ...t("invert"), ...ee }),
			backdropOpacity: ({ theme: t }) => ({ ...t("opacity"), ...ee }),
			backdropSaturate: ({ theme: t }) => ({ ...t("saturate"), ...ee }),
			backdropSepia: ({ theme: t }) => ({ ...t("sepia"), ...ee }),
			backgroundColor: ({ theme: t }) => t("colors"),
			backgroundImage: {
				none: "none",
				"gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
				"gradient-to-tr":
					"linear-gradient(to top right, var(--tw-gradient-stops))",
				"gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
				"gradient-to-br":
					"linear-gradient(to bottom right, var(--tw-gradient-stops))",
				"gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
				"gradient-to-bl":
					"linear-gradient(to bottom left, var(--tw-gradient-stops))",
				"gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
				"gradient-to-tl":
					"linear-gradient(to top left, var(--tw-gradient-stops))",
			},
			backgroundOpacity: ({ theme: t }) => t("opacity"),
			backgroundPosition: {
				bottom: "bottom",
				center: "center",
				left: "left",
				"left-bottom": "left bottom",
				"left-top": "left top",
				right: "right",
				"right-bottom": "right bottom",
				"right-top": "right top",
				top: "top",
			},
			backgroundSize: { auto: "auto", cover: "cover", contain: "contain" },
			blur: {
				0: "0",
				none: "",
				sm: "4px",
				DEFAULT: "8px",
				md: "12px",
				lg: "16px",
				xl: "24px",
				"2xl": "40px",
				"3xl": "64px",
			},
			borderColor: ({ theme: t }) => ({
				DEFAULT: "currentcolor",
				...t("colors"),
			}),
			borderOpacity: ({ theme: t }) => t("opacity"),
			borderRadius: {
				none: "0px",
				sm: "0.125rem",
				DEFAULT: "0.25rem",
				md: "0.375rem",
				lg: "0.5rem",
				xl: "0.75rem",
				"2xl": "1rem",
				"3xl": "1.5rem",
				full: "9999px",
			},
			borderSpacing: ({ theme: t }) => t("spacing"),
			borderWidth: {
				DEFAULT: "1px",
				0: "0px",
				2: "2px",
				4: "4px",
				8: "8px",
				...me,
			},
			boxShadow: {
				sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
				DEFAULT:
					"0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
				md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
				lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
				xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
				"2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
				inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
				none: "none",
			},
			boxShadowColor: ({ theme: t }) => t("colors"),
			brightness: {
				0: "0",
				50: ".5",
				75: ".75",
				90: ".9",
				95: ".95",
				100: "1",
				105: "1.05",
				110: "1.1",
				125: "1.25",
				150: "1.5",
				200: "2",
				...ee,
			},
			caretColor: ({ theme: t }) => t("colors"),
			colors: () => ({ ...ut }),
			columns: {
				auto: "auto",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6",
				7: "7",
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12",
				"3xs": "16rem",
				"2xs": "18rem",
				xs: "20rem",
				sm: "24rem",
				md: "28rem",
				lg: "32rem",
				xl: "36rem",
				"2xl": "42rem",
				"3xl": "48rem",
				"4xl": "56rem",
				"5xl": "64rem",
				"6xl": "72rem",
				"7xl": "80rem",
				...oe,
			},
			container: {},
			content: { none: "none" },
			contrast: {
				0: "0",
				50: ".5",
				75: ".75",
				100: "1",
				125: "1.25",
				150: "1.5",
				200: "2",
				...ee,
			},
			cursor: {
				auto: "auto",
				default: "default",
				pointer: "pointer",
				wait: "wait",
				text: "text",
				move: "move",
				help: "help",
				"not-allowed": "not-allowed",
				none: "none",
				"context-menu": "context-menu",
				progress: "progress",
				cell: "cell",
				crosshair: "crosshair",
				"vertical-text": "vertical-text",
				alias: "alias",
				copy: "copy",
				"no-drop": "no-drop",
				grab: "grab",
				grabbing: "grabbing",
				"all-scroll": "all-scroll",
				"col-resize": "col-resize",
				"row-resize": "row-resize",
				"n-resize": "n-resize",
				"e-resize": "e-resize",
				"s-resize": "s-resize",
				"w-resize": "w-resize",
				"ne-resize": "ne-resize",
				"nw-resize": "nw-resize",
				"se-resize": "se-resize",
				"sw-resize": "sw-resize",
				"ew-resize": "ew-resize",
				"ns-resize": "ns-resize",
				"nesw-resize": "nesw-resize",
				"nwse-resize": "nwse-resize",
				"zoom-in": "zoom-in",
				"zoom-out": "zoom-out",
			},
			divideColor: ({ theme: t }) => t("borderColor"),
			divideOpacity: ({ theme: t }) => t("borderOpacity"),
			divideWidth: ({ theme: t }) => ({ ...t("borderWidth"), ...me }),
			dropShadow: {
				sm: "0 1px 1px rgb(0 0 0 / 0.05)",
				DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
				md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
				lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
				xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
				"2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
				none: "0 0 #0000",
			},
			fill: ({ theme: t }) => t("colors"),
			flex: {
				1: "1 1 0%",
				auto: "1 1 auto",
				initial: "0 1 auto",
				none: "none",
			},
			flexBasis: ({ theme: t }) => ({
				auto: "auto",
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				"1/5": "20%",
				"2/5": "40%",
				"3/5": "60%",
				"4/5": "80%",
				"1/6": "16.666667%",
				"2/6": "33.333333%",
				"3/6": "50%",
				"4/6": "66.666667%",
				"5/6": "83.333333%",
				"1/12": "8.333333%",
				"2/12": "16.666667%",
				"3/12": "25%",
				"4/12": "33.333333%",
				"5/12": "41.666667%",
				"6/12": "50%",
				"7/12": "58.333333%",
				"8/12": "66.666667%",
				"9/12": "75%",
				"10/12": "83.333333%",
				"11/12": "91.666667%",
				full: "100%",
				...t("spacing"),
			}),
			flexGrow: { 0: "0", DEFAULT: "1", ...oe },
			flexShrink: { 0: "0", DEFAULT: "1", ...oe },
			fontFamily: {
				sans: [
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
				serif: [
					"ui-serif",
					"Georgia",
					"Cambria",
					'"Times New Roman"',
					"Times",
					"serif",
				],
				mono: [
					"ui-monospace",
					"SFMono-Regular",
					"Menlo",
					"Monaco",
					"Consolas",
					'"Liberation Mono"',
					'"Courier New"',
					"monospace",
				],
			},
			fontSize: {
				xs: ["0.75rem", { lineHeight: "1rem" }],
				sm: ["0.875rem", { lineHeight: "1.25rem" }],
				base: ["1rem", { lineHeight: "1.5rem" }],
				lg: ["1.125rem", { lineHeight: "1.75rem" }],
				xl: ["1.25rem", { lineHeight: "1.75rem" }],
				"2xl": ["1.5rem", { lineHeight: "2rem" }],
				"3xl": ["1.875rem", { lineHeight: "2.25rem" }],
				"4xl": ["2.25rem", { lineHeight: "2.5rem" }],
				"5xl": ["3rem", { lineHeight: "1" }],
				"6xl": ["3.75rem", { lineHeight: "1" }],
				"7xl": ["4.5rem", { lineHeight: "1" }],
				"8xl": ["6rem", { lineHeight: "1" }],
				"9xl": ["8rem", { lineHeight: "1" }],
			},
			fontWeight: {
				thin: "100",
				extralight: "200",
				light: "300",
				normal: "400",
				medium: "500",
				semibold: "600",
				bold: "700",
				extrabold: "800",
				black: "900",
			},
			gap: ({ theme: t }) => t("spacing"),
			gradientColorStops: ({ theme: t }) => t("colors"),
			gradientColorStopPositions: {
				"0%": "0%",
				"5%": "5%",
				"10%": "10%",
				"15%": "15%",
				"20%": "20%",
				"25%": "25%",
				"30%": "30%",
				"35%": "35%",
				"40%": "40%",
				"45%": "45%",
				"50%": "50%",
				"55%": "55%",
				"60%": "60%",
				"65%": "65%",
				"70%": "70%",
				"75%": "75%",
				"80%": "80%",
				"85%": "85%",
				"90%": "90%",
				"95%": "95%",
				"100%": "100%",
				...ee,
			},
			grayscale: { 0: "0", DEFAULT: "100%", ...ee },
			gridAutoColumns: {
				auto: "auto",
				min: "min-content",
				max: "max-content",
				fr: "minmax(0, 1fr)",
			},
			gridAutoRows: {
				auto: "auto",
				min: "min-content",
				max: "max-content",
				fr: "minmax(0, 1fr)",
			},
			gridColumn: {
				auto: "auto",
				"span-1": "span 1 / span 1",
				"span-2": "span 2 / span 2",
				"span-3": "span 3 / span 3",
				"span-4": "span 4 / span 4",
				"span-5": "span 5 / span 5",
				"span-6": "span 6 / span 6",
				"span-7": "span 7 / span 7",
				"span-8": "span 8 / span 8",
				"span-9": "span 9 / span 9",
				"span-10": "span 10 / span 10",
				"span-11": "span 11 / span 11",
				"span-12": "span 12 / span 12",
				"span-full": "1 / -1",
			},
			gridColumnEnd: {
				auto: "auto",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6",
				7: "7",
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12",
				13: "13",
				...oe,
			},
			gridColumnStart: {
				auto: "auto",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6",
				7: "7",
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12",
				13: "13",
				...oe,
			},
			gridRow: {
				auto: "auto",
				"span-1": "span 1 / span 1",
				"span-2": "span 2 / span 2",
				"span-3": "span 3 / span 3",
				"span-4": "span 4 / span 4",
				"span-5": "span 5 / span 5",
				"span-6": "span 6 / span 6",
				"span-7": "span 7 / span 7",
				"span-8": "span 8 / span 8",
				"span-9": "span 9 / span 9",
				"span-10": "span 10 / span 10",
				"span-11": "span 11 / span 11",
				"span-12": "span 12 / span 12",
				"span-full": "1 / -1",
			},
			gridRowEnd: {
				auto: "auto",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6",
				7: "7",
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12",
				13: "13",
				...oe,
			},
			gridRowStart: {
				auto: "auto",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6",
				7: "7",
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12",
				13: "13",
				...oe,
			},
			gridTemplateColumns: {
				none: "none",
				subgrid: "subgrid",
				1: "repeat(1, minmax(0, 1fr))",
				2: "repeat(2, minmax(0, 1fr))",
				3: "repeat(3, minmax(0, 1fr))",
				4: "repeat(4, minmax(0, 1fr))",
				5: "repeat(5, minmax(0, 1fr))",
				6: "repeat(6, minmax(0, 1fr))",
				7: "repeat(7, minmax(0, 1fr))",
				8: "repeat(8, minmax(0, 1fr))",
				9: "repeat(9, minmax(0, 1fr))",
				10: "repeat(10, minmax(0, 1fr))",
				11: "repeat(11, minmax(0, 1fr))",
				12: "repeat(12, minmax(0, 1fr))",
				...ro,
			},
			gridTemplateRows: {
				none: "none",
				subgrid: "subgrid",
				1: "repeat(1, minmax(0, 1fr))",
				2: "repeat(2, minmax(0, 1fr))",
				3: "repeat(3, minmax(0, 1fr))",
				4: "repeat(4, minmax(0, 1fr))",
				5: "repeat(5, minmax(0, 1fr))",
				6: "repeat(6, minmax(0, 1fr))",
				7: "repeat(7, minmax(0, 1fr))",
				8: "repeat(8, minmax(0, 1fr))",
				9: "repeat(9, minmax(0, 1fr))",
				10: "repeat(10, minmax(0, 1fr))",
				11: "repeat(11, minmax(0, 1fr))",
				12: "repeat(12, minmax(0, 1fr))",
				...ro,
			},
			height: ({ theme: t }) => ({
				auto: "auto",
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				"1/5": "20%",
				"2/5": "40%",
				"3/5": "60%",
				"4/5": "80%",
				"1/6": "16.666667%",
				"2/6": "33.333333%",
				"3/6": "50%",
				"4/6": "66.666667%",
				"5/6": "83.333333%",
				full: "100%",
				screen: "100vh",
				svh: "100svh",
				lvh: "100lvh",
				dvh: "100dvh",
				min: "min-content",
				max: "max-content",
				fit: "fit-content",
				...t("spacing"),
			}),
			hueRotate: {
				0: "0deg",
				15: "15deg",
				30: "30deg",
				60: "60deg",
				90: "90deg",
				180: "180deg",
				...ct,
			},
			inset: ({ theme: t }) => ({
				auto: "auto",
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				full: "100%",
				...t("spacing"),
			}),
			invert: { 0: "0", DEFAULT: "100%", ...ee },
			keyframes: {
				spin: { to: { transform: "rotate(360deg)" } },
				ping: { "75%, 100%": { transform: "scale(2)", opacity: "0" } },
				pulse: { "50%": { opacity: ".5" } },
				bounce: {
					"0%, 100%": {
						transform: "translateY(-25%)",
						animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
					},
					"50%": {
						transform: "none",
						animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
					},
				},
			},
			letterSpacing: {
				tighter: "-0.05em",
				tight: "-0.025em",
				normal: "0em",
				wide: "0.025em",
				wider: "0.05em",
				widest: "0.1em",
			},
			lineHeight: {
				none: "1",
				tight: "1.25",
				snug: "1.375",
				normal: "1.5",
				relaxed: "1.625",
				loose: "2",
				3: ".75rem",
				4: "1rem",
				5: "1.25rem",
				6: "1.5rem",
				7: "1.75rem",
				8: "2rem",
				9: "2.25rem",
				10: "2.5rem",
			},
			listStyleType: { none: "none", disc: "disc", decimal: "decimal" },
			listStyleImage: { none: "none" },
			margin: ({ theme: t }) => ({ auto: "auto", ...t("spacing") }),
			lineClamp: { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", ...oe },
			maxHeight: ({ theme: t }) => ({
				none: "none",
				full: "100%",
				screen: "100vh",
				svh: "100svh",
				lvh: "100lvh",
				dvh: "100dvh",
				min: "min-content",
				max: "max-content",
				fit: "fit-content",
				...t("spacing"),
			}),
			maxWidth: ({ theme: t }) => ({
				none: "none",
				xs: "20rem",
				sm: "24rem",
				md: "28rem",
				lg: "32rem",
				xl: "36rem",
				"2xl": "42rem",
				"3xl": "48rem",
				"4xl": "56rem",
				"5xl": "64rem",
				"6xl": "72rem",
				"7xl": "80rem",
				full: "100%",
				min: "min-content",
				max: "max-content",
				fit: "fit-content",
				prose: "65ch",
				...t("spacing"),
			}),
			minHeight: ({ theme: t }) => ({
				full: "100%",
				screen: "100vh",
				svh: "100svh",
				lvh: "100lvh",
				dvh: "100dvh",
				min: "min-content",
				max: "max-content",
				fit: "fit-content",
				...t("spacing"),
			}),
			minWidth: ({ theme: t }) => ({
				full: "100%",
				min: "min-content",
				max: "max-content",
				fit: "fit-content",
				...t("spacing"),
			}),
			objectPosition: {
				bottom: "bottom",
				center: "center",
				left: "left",
				"left-bottom": "left bottom",
				"left-top": "left top",
				right: "right",
				"right-bottom": "right bottom",
				"right-top": "right top",
				top: "top",
			},
			opacity: {
				0: "0",
				5: "0.05",
				10: "0.1",
				15: "0.15",
				20: "0.2",
				25: "0.25",
				30: "0.3",
				35: "0.35",
				40: "0.4",
				45: "0.45",
				50: "0.5",
				55: "0.55",
				60: "0.6",
				65: "0.65",
				70: "0.7",
				75: "0.75",
				80: "0.8",
				85: "0.85",
				90: "0.9",
				95: "0.95",
				100: "1",
				...ee,
			},
			order: {
				first: "-9999",
				last: "9999",
				none: "0",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6",
				7: "7",
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12",
				...oe,
			},
			outlineColor: ({ theme: t }) => t("colors"),
			outlineOffset: {
				0: "0px",
				1: "1px",
				2: "2px",
				4: "4px",
				8: "8px",
				...me,
			},
			outlineWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...me },
			padding: ({ theme: t }) => t("spacing"),
			placeholderColor: ({ theme: t }) => t("colors"),
			placeholderOpacity: ({ theme: t }) => t("opacity"),
			ringColor: ({ theme: t }) => ({
				DEFAULT: "currentcolor",
				...t("colors"),
			}),
			ringOffsetColor: ({ theme: t }) => t("colors"),
			ringOffsetWidth: {
				0: "0px",
				1: "1px",
				2: "2px",
				4: "4px",
				8: "8px",
				...me,
			},
			ringOpacity: ({ theme: t }) => ({ DEFAULT: "0.5", ...t("opacity") }),
			ringWidth: {
				DEFAULT: "3px",
				0: "0px",
				1: "1px",
				2: "2px",
				4: "4px",
				8: "8px",
				...me,
			},
			rotate: {
				0: "0deg",
				1: "1deg",
				2: "2deg",
				3: "3deg",
				6: "6deg",
				12: "12deg",
				45: "45deg",
				90: "90deg",
				180: "180deg",
				...ct,
			},
			saturate: { 0: "0", 50: ".5", 100: "1", 150: "1.5", 200: "2", ...ee },
			scale: {
				0: "0",
				50: ".5",
				75: ".75",
				90: ".9",
				95: ".95",
				100: "1",
				105: "1.05",
				110: "1.1",
				125: "1.25",
				150: "1.5",
				...ee,
			},
			screens: {
				sm: "40rem",
				md: "48rem",
				lg: "64rem",
				xl: "80rem",
				"2xl": "96rem",
			},
			scrollMargin: ({ theme: t }) => t("spacing"),
			scrollPadding: ({ theme: t }) => t("spacing"),
			sepia: { 0: "0", DEFAULT: "100%", ...ee },
			skew: {
				0: "0deg",
				1: "1deg",
				2: "2deg",
				3: "3deg",
				6: "6deg",
				12: "12deg",
				...ct,
			},
			space: ({ theme: t }) => t("spacing"),
			spacing: {
				px: "1px",
				0: "0px",
				0.5: "0.125rem",
				1: "0.25rem",
				1.5: "0.375rem",
				2: "0.5rem",
				2.5: "0.625rem",
				3: "0.75rem",
				3.5: "0.875rem",
				4: "1rem",
				5: "1.25rem",
				6: "1.5rem",
				7: "1.75rem",
				8: "2rem",
				9: "2.25rem",
				10: "2.5rem",
				11: "2.75rem",
				12: "3rem",
				14: "3.5rem",
				16: "4rem",
				20: "5rem",
				24: "6rem",
				28: "7rem",
				32: "8rem",
				36: "9rem",
				40: "10rem",
				44: "11rem",
				48: "12rem",
				52: "13rem",
				56: "14rem",
				60: "15rem",
				64: "16rem",
				72: "18rem",
				80: "20rem",
				96: "24rem",
			},
			stroke: ({ theme: t }) => ({ none: "none", ...t("colors") }),
			strokeWidth: { 0: "0", 1: "1", 2: "2", ...oe },
			supports: {},
			data: {},
			textColor: ({ theme: t }) => t("colors"),
			textDecorationColor: ({ theme: t }) => t("colors"),
			textDecorationThickness: {
				auto: "auto",
				"from-font": "from-font",
				0: "0px",
				1: "1px",
				2: "2px",
				4: "4px",
				8: "8px",
				...me,
			},
			textIndent: ({ theme: t }) => t("spacing"),
			textOpacity: ({ theme: t }) => t("opacity"),
			textUnderlineOffset: {
				auto: "auto",
				0: "0px",
				1: "1px",
				2: "2px",
				4: "4px",
				8: "8px",
				...me,
			},
			transformOrigin: {
				center: "center",
				top: "top",
				"top-right": "top right",
				right: "right",
				"bottom-right": "bottom right",
				bottom: "bottom",
				"bottom-left": "bottom left",
				left: "left",
				"top-left": "top left",
			},
			transitionDelay: {
				0: "0s",
				75: "75ms",
				100: "100ms",
				150: "150ms",
				200: "200ms",
				300: "300ms",
				500: "500ms",
				700: "700ms",
				1e3: "1000ms",
				...to,
			},
			transitionDuration: {
				DEFAULT: "150ms",
				0: "0s",
				75: "75ms",
				100: "100ms",
				150: "150ms",
				200: "200ms",
				300: "300ms",
				500: "500ms",
				700: "700ms",
				1e3: "1000ms",
				...to,
			},
			transitionProperty: {
				none: "none",
				all: "all",
				DEFAULT:
					"color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
				colors:
					"color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
				opacity: "opacity",
				shadow: "box-shadow",
				transform: "transform",
			},
			transitionTimingFunction: {
				DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
				linear: "linear",
				in: "cubic-bezier(0.4, 0, 1, 1)",
				out: "cubic-bezier(0, 0, 0.2, 1)",
				"in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
			},
			translate: ({ theme: t }) => ({
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				full: "100%",
				...t("spacing"),
			}),
			size: ({ theme: t }) => ({
				auto: "auto",
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				"1/5": "20%",
				"2/5": "40%",
				"3/5": "60%",
				"4/5": "80%",
				"1/6": "16.666667%",
				"2/6": "33.333333%",
				"3/6": "50%",
				"4/6": "66.666667%",
				"5/6": "83.333333%",
				"1/12": "8.333333%",
				"2/12": "16.666667%",
				"3/12": "25%",
				"4/12": "33.333333%",
				"5/12": "41.666667%",
				"6/12": "50%",
				"7/12": "58.333333%",
				"8/12": "66.666667%",
				"9/12": "75%",
				"10/12": "83.333333%",
				"11/12": "91.666667%",
				full: "100%",
				min: "min-content",
				max: "max-content",
				fit: "fit-content",
				...t("spacing"),
			}),
			width: ({ theme: t }) => ({
				auto: "auto",
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				"1/5": "20%",
				"2/5": "40%",
				"3/5": "60%",
				"4/5": "80%",
				"1/6": "16.666667%",
				"2/6": "33.333333%",
				"3/6": "50%",
				"4/6": "66.666667%",
				"5/6": "83.333333%",
				"1/12": "8.333333%",
				"2/12": "16.666667%",
				"3/12": "25%",
				"4/12": "33.333333%",
				"5/12": "41.666667%",
				"6/12": "50%",
				"7/12": "58.333333%",
				"8/12": "66.666667%",
				"9/12": "75%",
				"10/12": "83.333333%",
				"11/12": "91.666667%",
				full: "100%",
				screen: "100vw",
				svw: "100svw",
				lvw: "100lvw",
				dvw: "100dvw",
				min: "min-content",
				max: "max-content",
				fit: "fit-content",
				...t("spacing"),
			}),
			willChange: {
				auto: "auto",
				scroll: "scroll-position",
				contents: "contents",
				transform: "transform",
			},
			zIndex: {
				auto: "auto",
				0: "0",
				10: "10",
				20: "20",
				30: "30",
				40: "40",
				50: "50",
				...oe,
			},
		}
	function io(t) {
		return {
			theme: {
				...oo,
				colors: ({ theme: r }) => r("color", {}),
				extend: {
					fontSize: ({ theme: r }) => ({ ...r("text", {}) }),
					boxShadow: ({ theme: r }) => ({ ...r("shadow", {}) }),
					animation: ({ theme: r }) => ({ ...r("animate", {}) }),
					aspectRatio: ({ theme: r }) => ({ ...r("aspect", {}) }),
					borderRadius: ({ theme: r }) => ({ ...r("radius", {}) }),
					screens: ({ theme: r }) => ({ ...r("breakpoint", {}) }),
					letterSpacing: ({ theme: r }) => ({ ...r("tracking", {}) }),
					lineHeight: ({ theme: r }) => ({ ...r("leading", {}) }),
					transitionDuration: {
						DEFAULT: t.get(["--default-transition-duration"]) ?? null,
					},
					transitionTimingFunction: {
						DEFAULT: t.get(["--default-transition-timing-function"]) ?? null,
					},
					maxWidth: ({ theme: r }) => ({ ...r("container", {}) }),
				},
			},
		}
	}
	var Wi = {
		blocklist: [],
		future: {},
		prefix: "",
		important: !1,
		darkMode: null,
		theme: {},
		plugins: [],
		content: { files: [] },
	}
	function Dt(t, r) {
		const o = {
			design: t,
			configs: [],
			plugins: [],
			content: { files: [] },
			theme: {},
			extend: {},
			result: structuredClone(Wi),
		}
		for (const i of r) Ut(o, i)
		for (const i of o.configs)
			"darkMode" in i &&
				i.darkMode !== void 0 &&
				(o.result.darkMode = i.darkMode ?? null),
				"prefix" in i &&
					i.prefix !== void 0 &&
					(o.result.prefix = i.prefix ?? ""),
				"blocklist" in i &&
					i.blocklist !== void 0 &&
					(o.result.blocklist = i.blocklist ?? []),
				"important" in i &&
					i.important !== void 0 &&
					(o.result.important = i.important ?? !1)
		const e = Hi(o)
		return {
			resolvedConfig: {
				...o.result,
				content: o.content,
				theme: o.theme,
				plugins: o.plugins,
			},
			replacedThemeKeys: e,
		}
	}
	function qi(t, r) {
		if (Array.isArray(t) && Ve(t[0])) return t.concat(r)
		if (Array.isArray(r) && Ve(r[0]) && Ve(t)) return [t, ...r]
		if (Array.isArray(r)) return r
	}
	function Ut(t, { config: r, base: o, path: e, reference: i }) {
		const s = []
		for (const u of r.plugins ?? [])
			"__isOptionsFunction" in u
				? s.push({ ...u(), reference: i })
				: "handler" in u
					? s.push({ ...u, reference: i })
					: s.push({ handler: u, reference: i })
		if (Array.isArray(r.presets) && r.presets.length === 0)
			throw new Error(
				"Error in the config file/plugin/preset. An empty preset (`preset: []`) is not currently supported.",
			)
		for (const u of r.presets ?? [])
			Ut(t, { path: e, base: o, config: u, reference: i })
		for (const u of s)
			t.plugins.push(u),
				u.config &&
					Ut(t, {
						path: e,
						base: o,
						config: u.config,
						reference: !!u.reference,
					})
		const a = r.content ?? [],
			d = Array.isArray(a) ? a : a.files
		for (const u of d)
			t.content.files.push(typeof u == "object" ? u : { base: o, pattern: u })
		t.configs.push(r)
	}
	function Hi(t) {
		const r = new Set(),
			o = at(t.design, () => t.theme, i),
			e = Object.assign(o, { theme: o, colors: ut })
		function i(s) {
			return typeof s == "function" ? (s(e) ?? null) : (s ?? null)
		}
		for (const s of t.configs) {
			const a = s.theme ?? {},
				d = a.extend ?? {}
			for (const u in a) u !== "extend" && r.add(u)
			Object.assign(t.theme, a)
			for (const u in d) (t.extend[u] ??= []), t.extend[u].push(d[u])
		}
		delete t.theme.extend
		for (const s in t.extend) {
			const a = [t.theme[s], ...t.extend[s]]
			t.theme[s] = () => {
				const d = a.map(i)
				return Ue({}, d, qi)
			}
		}
		for (const s in t.theme) t.theme[s] = i(t.theme[s])
		if (t.theme.screens && typeof t.theme.screens == "object")
			for (const s of Object.keys(t.theme.screens)) {
				const a = t.theme.screens[s]
				a &&
					typeof a == "object" &&
					("raw" in a ||
						"max" in a ||
						("min" in a && (t.theme.screens[s] = a.min)))
			}
		return r
	}
	function no(t, r) {
		const o = t.theme.container || {}
		if (typeof o != "object" || o === null) return
		const e = Gi(o, r)
		e.length !== 0 && r.utilities.static("container", () => structuredClone(e))
	}
	function Gi({ center: t, padding: r, screens: o }, e) {
		let i = [],
			s = null
		if (
			(t && i.push(l("margin-inline", "auto")),
			(typeof r == "string" ||
				(typeof r == "object" && r !== null && "DEFAULT" in r)) &&
				i.push(l("padding-inline", typeof r == "string" ? r : r.DEFAULT)),
			typeof o == "object" && o !== null)
		) {
			s = new Map()
			const a = Array.from(e.theme.namespace("--breakpoint").entries())
			if ((a.sort((d, u) => ve(d[1], u[1], "asc")), a.length > 0)) {
				const [d] = a[0]
				i.push(
					D("@media", `(width >= --theme(--breakpoint-${d}))`, [
						l("max-width", "none"),
					]),
				)
			}
			for (let [d, u] of Object.entries(o)) {
				if (typeof u == "object")
					if ("min" in u) u = u.min
					else continue
				s.set(d, D("@media", `(width >= ${u})`, [l("max-width", u)]))
			}
		}
		if (typeof r == "object" && r !== null) {
			const a = Object.entries(r)
				.filter(([d]) => d !== "DEFAULT")
				.map(([d, u]) => [d, e.theme.resolveValue(d, ["--breakpoint"]), u])
				.filter(Boolean)
			a.sort((d, u) => ve(d[1], u[1], "asc"))
			for (const [d, , u] of a)
				if (s && s.has(d)) s.get(d).nodes.push(l("padding-inline", u))
				else {
					if (s) continue
					i.push(
						D("@media", `(width >= theme(--breakpoint-${d}))`, [
							l("padding-inline", u),
						]),
					)
				}
		}
		if (s) for (const [, a] of s) i.push(a)
		return i
	}
	function lo({ addVariant: t, config: r }) {
		let o = r("darkMode", null),
			[e, i = ".dark"] = Array.isArray(o) ? o : [o]
		if (e === "variant") {
			let s
			if (
				(Array.isArray(i) || typeof i == "function"
					? (s = i)
					: typeof i == "string" && (s = [i]),
				Array.isArray(s))
			)
				for (const a of s)
					a === ".dark"
						? ((e = !1),
							console.warn(
								'When using `variant` for `darkMode`, you must provide a selector.\nExample: `darkMode: ["variant", ".your-selector &"]`',
							))
						: a.includes("&") ||
							((e = !1),
							console.warn(
								'When using `variant` for `darkMode`, your selector must contain `&`.\nExample `darkMode: ["variant", ".your-selector &"]`',
							))
			i = s
		}
		e === null ||
			(e === "selector"
				? t("dark", `&:where(${i}, ${i} *)`)
				: e === "media"
					? t("dark", "@media (prefers-color-scheme: dark)")
					: e === "variant"
						? t("dark", i)
						: e === "class" && t("dark", `&:is(${i} *)`))
	}
	function ao(t) {
		for (const [r, o] of [
			["t", "top"],
			["tr", "top right"],
			["r", "right"],
			["br", "bottom right"],
			["b", "bottom"],
			["bl", "bottom left"],
			["l", "left"],
			["tl", "top left"],
		])
			t.utilities.static(`bg-gradient-to-${r}`, () => [
				l("--tw-gradient-position", `to ${o} in oklab`),
				l("background-image", "linear-gradient(var(--tw-gradient-stops))"),
			])
		t.utilities.static("bg-left-top", () => [
			l("background-position", "left top"),
		]),
			t.utilities.static("bg-right-top", () => [
				l("background-position", "right top"),
			]),
			t.utilities.static("bg-left-bottom", () => [
				l("background-position", "left bottom"),
			]),
			t.utilities.static("bg-right-bottom", () => [
				l("background-position", "right bottom"),
			]),
			t.utilities.static("object-left-top", () => [
				l("object-position", "left top"),
			]),
			t.utilities.static("object-right-top", () => [
				l("object-position", "right top"),
			]),
			t.utilities.static("object-left-bottom", () => [
				l("object-position", "left bottom"),
			]),
			t.utilities.static("object-right-bottom", () => [
				l("object-position", "right bottom"),
			]),
			t.utilities.functional("max-w-screen", (r) => {
				if (!r.value || r.value.kind === "arbitrary") return
				const o = t.theme.resolve(r.value.value, ["--breakpoint"])
				if (o) return [l("max-width", o)]
			}),
			t.utilities.static("overflow-ellipsis", () => [
				l("text-overflow", "ellipsis"),
			]),
			t.utilities.static("decoration-slice", () => [
				l("-webkit-box-decoration-break", "slice"),
				l("box-decoration-break", "slice"),
			]),
			t.utilities.static("decoration-clone", () => [
				l("-webkit-box-decoration-break", "clone"),
				l("box-decoration-break", "clone"),
			]),
			t.utilities.functional("flex-shrink", (r) => {
				if (!r.modifier) {
					if (!r.value) return [l("flex-shrink", "1")]
					if (r.value.kind === "arbitrary")
						return [l("flex-shrink", r.value.value)]
					if (V(r.value.value)) return [l("flex-shrink", r.value.value)]
				}
			}),
			t.utilities.functional("flex-grow", (r) => {
				if (!r.modifier) {
					if (!r.value) return [l("flex-grow", "1")]
					if (r.value.kind === "arbitrary")
						return [l("flex-grow", r.value.value)]
					if (V(r.value.value)) return [l("flex-grow", r.value.value)]
				}
			})
	}
	function so(t, r) {
		const o = t.theme.screens || {},
			e = r.variants.get("min")?.order ?? 0,
			i = []
		for (const [a, d] of Object.entries(o)) {
			const h = (k) => {
				r.variants.static(
					a,
					(v) => {
						v.nodes = [D("@media", m, v.nodes)]
					},
					{ order: k },
				)
			}
			var s = h
			const u = r.variants.get(a),
				c = r.theme.resolveValue(a, ["--breakpoint"])
			if (u && c && !r.theme.hasDefault(`--breakpoint-${a}`)) continue
			let g = !0
			typeof d == "string" && (g = !1)
			const m = Yi(d)
			g ? i.push(h) : h(e)
		}
		if (i.length !== 0) {
			for (const [, a] of r.variants.variants)
				a.order > e && (a.order += i.length)
			r.variants.compareFns = new Map(
				Array.from(r.variants.compareFns).map(
					([a, d]) => (a > e && (a += i.length), [a, d]),
				),
			)
			for (const [a, d] of i.entries()) d(e + a + 1)
		}
	}
	function Yi(t) {
		return (Array.isArray(t) ? t : [t])
			.map((o) =>
				typeof o == "string"
					? { min: o }
					: o && typeof o == "object"
						? o
						: null,
			)
			.map((o) => {
				if (o === null) return null
				if ("raw" in o) return o.raw
				let e = ""
				return (
					o.max !== void 0 && (e += `${o.max} >= `),
					(e += "width"),
					o.min !== void 0 && (e += ` >= ${o.min}`),
					`(${e})`
				)
			})
			.filter(Boolean)
			.join(", ")
	}
	function uo(t, r) {
		const o = t.theme.aria || {},
			e = t.theme.supports || {},
			i = t.theme.data || {}
		if (Object.keys(o).length > 0) {
			const s = r.variants.get("aria"),
				a = s?.applyFn,
				d = s?.compounds
			r.variants.functional(
				"aria",
				(u, c) => {
					const g = c.value
					return g && g.kind === "named" && g.value in o
						? a?.(u, { ...c, value: { kind: "arbitrary", value: o[g.value] } })
						: a?.(u, c)
				},
				{ compounds: d },
			)
		}
		if (Object.keys(e).length > 0) {
			const s = r.variants.get("supports"),
				a = s?.applyFn,
				d = s?.compounds
			r.variants.functional(
				"supports",
				(u, c) => {
					const g = c.value
					return g && g.kind === "named" && g.value in e
						? a?.(u, { ...c, value: { kind: "arbitrary", value: e[g.value] } })
						: a?.(u, c)
				},
				{ compounds: d },
			)
		}
		if (Object.keys(i).length > 0) {
			const s = r.variants.get("data"),
				a = s?.applyFn,
				d = s?.compounds
			r.variants.functional(
				"data",
				(u, c) => {
					const g = c.value
					return g && g.kind === "named" && g.value in i
						? a?.(u, { ...c, value: { kind: "arbitrary", value: i[g.value] } })
						: a?.(u, c)
				},
				{ compounds: d },
			)
		}
	}
	var Ji = /^[a-z]+$/
	async function fo({
		designSystem: t,
		base: r,
		ast: o,
		loadModule: e,
		sources: i,
	}) {
		let s = 0,
			a = [],
			d = []
		j(o, (m, { parent: h, replaceWith: k, context: v }) => {
			if (m.kind === "at-rule") {
				if (m.name === "@plugin") {
					if (h !== null) throw new Error("`@plugin` cannot be nested.")
					const A = m.params.slice(1, -1)
					if (A.length === 0) throw new Error("`@plugin` must have a path.")
					const y = {}
					for (const b of m.nodes ?? []) {
						if (b.kind !== "declaration")
							throw new Error(`Unexpected \`@plugin\` option:

${re([b])}

\`@plugin\` options must be a flat list of declarations.`)
						if (b.value === void 0) continue
						const T = b.value,
							E = K(T, ",").map((P) => {
								if (((P = P.trim()), P === "null")) return null
								if (P === "true") return !0
								if (P === "false") return !1
								if (Number.isNaN(Number(P))) {
									if (
										(P[0] === '"' && P[P.length - 1] === '"') ||
										(P[0] === "'" && P[P.length - 1] === "'")
									)
										return P.slice(1, -1)
									if (P[0] === "{" && P[P.length - 1] === "}")
										throw new Error(`Unexpected \`@plugin\` option: Value of declaration \`${re([b]).trim()}\` is not supported.

Using an object as a plugin option is currently only supported in JavaScript configuration files.`)
								} else return Number(P)
								return P
							})
						y[b.property] = E.length === 1 ? E[0] : E
					}
					a.push([
						{ id: A, base: v.base, reference: !!v.reference },
						Object.keys(y).length > 0 ? y : null,
					]),
						k([]),
						(s |= 4)
					return
				}
				if (m.name === "@config") {
					if (m.nodes.length > 0)
						throw new Error("`@config` cannot have a body.")
					if (h !== null) throw new Error("`@config` cannot be nested.")
					d.push({
						id: m.params.slice(1, -1),
						base: v.base,
						reference: !!v.reference,
					}),
						k([]),
						(s |= 4)
					return
				}
			}
		}),
			ao(t)
		const u = t.resolveThemeValue
		if (
			((t.resolveThemeValue = (h, k) =>
				h.startsWith("--")
					? u(h, k)
					: ((s |= co({
							designSystem: t,
							base: r,
							ast: o,
							sources: i,
							configs: [],
							pluginDetails: [],
						})),
						t.resolveThemeValue(h, k))),
			!a.length && !d.length)
		)
			return 0
		const [c, g] = await Promise.all([
			Promise.all(
				d.map(async ({ id: m, base: h, reference: k }) => {
					const v = await e(m, h, "config")
					return { path: m, base: v.base, config: v.module, reference: k }
				}),
			),
			Promise.all(
				a.map(async ([{ id: m, base: h, reference: k }, v]) => {
					const A = await e(m, h, "plugin")
					return {
						path: m,
						base: A.base,
						plugin: A.module,
						options: v,
						reference: k,
					}
				}),
			),
		])
		return (
			(s |= co({
				designSystem: t,
				base: r,
				ast: o,
				sources: i,
				configs: c,
				pluginDetails: g,
			})),
			s
		)
	}
	function co({
		designSystem: t,
		base: r,
		ast: o,
		sources: e,
		configs: i,
		pluginDetails: s,
	}) {
		let a = 0,
			u = [
				...s.map((y) => {
					if (!y.options)
						return {
							config: { plugins: [y.plugin] },
							base: y.base,
							reference: y.reference,
						}
					if ("__isOptionsFunction" in y.plugin)
						return {
							config: { plugins: [y.plugin(y.options)] },
							base: y.base,
							reference: y.reference,
						}
					throw new Error(`The plugin "${y.path}" does not accept options`)
				}),
				...i,
			],
			{ resolvedConfig: c } = Dt(t, [
				{ config: io(t.theme), base: r, reference: !0 },
				...u,
				{ config: { plugins: [lo] }, base: r, reference: !0 },
			]),
			{ resolvedConfig: g, replacedThemeKeys: m } = Dt(t, u),
			h = t.resolveThemeValue
		t.resolveThemeValue = (b, T) => {
			if (b[0] === "-" && b[1] === "-") return h(b, T)
			const E = v.theme(b, void 0)
			if (Array.isArray(E) && E.length === 2) return E[0]
			if (Array.isArray(E)) return E.join(", ")
			if (typeof E == "string") return E
		}
		let k = {
				designSystem: t,
				ast: o,
				resolvedConfig: c,
				featuresRef: {
					set current(y) {
						a |= y
					},
				},
			},
			v = zt({ ...k, referenceMode: !1 }),
			A
		for (const { handler: y, reference: b } of c.plugins)
			b ? ((A ||= zt({ ...k, referenceMode: !0 })), y(A)) : y(v)
		if (
			(zr(t, g, m),
			eo(t, g, m),
			uo(g, t),
			so(g, t),
			no(g, t),
			!t.theme.prefix && c.prefix)
		) {
			if (
				(c.prefix.endsWith("-") &&
					((c.prefix = c.prefix.slice(0, -1)),
					console.warn(
						`The prefix "${c.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only and is written as a variant before all utilities. We have fixed up the prefix for you. Remove the trailing \`-\` to silence this warning.`,
					)),
				!Ji.test(c.prefix))
			)
				throw new Error(
					`The prefix "${c.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`,
				)
			t.theme.prefix = c.prefix
		}
		if (
			(!t.important && c.important === !0 && (t.important = !0),
			typeof c.important == "string")
		) {
			const y = c.important
			j(o, (b, { replaceWith: T, parent: E }) => {
				if (
					b.kind === "at-rule" &&
					!(b.name !== "@tailwind" || b.params !== "utilities")
				)
					return E?.kind === "rule" && E.selector === y ? 2 : (T(I(y, [b])), 2)
			})
		}
		for (const y of c.blocklist) t.invalidCandidates.add(y)
		for (const y of c.content.files) {
			if ("raw" in y)
				throw new Error(`Error in the config file/plugin/preset. The \`content\` key contains a \`raw\` entry:

${JSON.stringify(y, null, 2)}

This feature is not currently supported.`)
			let b = !1
			y.pattern[0] == "!" && ((b = !0), (y.pattern = y.pattern.slice(1))),
				e.push({ ...y, negated: b })
		}
		return a
	}
	var po = /^(-?\d+)\.\.(-?\d+)(?:\.\.(-?\d+))?$/
	function ft(t) {
		const r = t.indexOf("{")
		if (r === -1) return [t]
		let o = [],
			e = t.slice(0, r),
			i = t.slice(r),
			s = 0,
			a = i.lastIndexOf("}")
		for (let m = 0; m < i.length; m++) {
			const h = i[m]
			if (h === "{") s++
			else if (h === "}" && (s--, s === 0)) {
				a = m
				break
			}
		}
		if (a === -1) throw new Error(`The pattern \`${t}\` is not balanced.`)
		let d = i.slice(1, a),
			u = i.slice(a + 1),
			c
		Qi(d) ? (c = Zi(d)) : (c = K(d, ",")), (c = c.flatMap((m) => ft(m)))
		const g = ft(u)
		for (const m of g) for (const h of c) o.push(e + h + m)
		return o
	}
	function Qi(t) {
		return po.test(t)
	}
	function Zi(t) {
		const r = t.match(po)
		if (!r) return [t]
		let [, o, e, i] = r,
			s = i ? Number.parseInt(i, 10) : void 0,
			a = []
		if (/^-?\d+$/.test(o) && /^-?\d+$/.test(e)) {
			const d = Number.parseInt(o, 10),
				u = Number.parseInt(e, 10)
			if ((s === void 0 && (s = d <= u ? 1 : -1), s === 0))
				throw new Error("Step cannot be zero in sequence expansion.")
			if (s > 0)
				for (let c = d; c <= u; c += s) {
					const g = c.toString()
					a.push(g)
				}
			else
				for (let c = d; c >= u; c += s) {
					const g = c.toString()
					a.push(g)
				}
		}
		return a
	}
	var Xi = /^[a-z]+$/
	function en() {
		throw new Error("No `loadModule` function provided to `compile`")
	}
	function tn() {
		throw new Error("No `loadStylesheet` function provided to `compile`")
	}
	function rn(t) {
		let r = 0,
			o = null
		for (const e of K(t, " "))
			e === "reference"
				? (r |= 2)
				: e === "inline"
					? (r |= 1)
					: e === "default"
						? (r |= 4)
						: e === "static"
							? (r |= 8)
							: e.startsWith("prefix(") &&
								e.endsWith(")") &&
								(o = e.slice(7, -1))
		return [r, o]
	}
	async function on(
		t,
		{ base: r = "", loadModule: o = en, loadStylesheet: e = tn } = {},
	) {
		let i = 0
		;(t = [ne({ base: r }, t)]), (i |= await Kt(t, r, e))
		let s = null,
			a = new He(),
			d = [],
			u = [],
			c = null,
			g = null,
			m = [],
			h = [],
			k = [],
			v = [],
			A = null
		j(t, (b, { parent: T, replaceWith: E, context: P }) => {
			if (b.kind === "at-rule") {
				if (
					b.name === "@tailwind" &&
					(b.params === "utilities" || b.params.startsWith("utilities"))
				) {
					if (g !== null) {
						E([])
						return
					}
					const _ = K(b.params, " ")
					for (const L of _)
						if (L.startsWith("source(")) {
							const R = L.slice(7, -1)
							if (R === "none") {
								A = R
								continue
							}
							if (
								(R[0] === '"' && R[R.length - 1] !== '"') ||
								(R[0] === "'" && R[R.length - 1] !== "'") ||
								(R[0] !== "'" && R[0] !== '"')
							)
								throw new Error("`source(\u2026)` paths must be quoted.")
							A = { base: P.sourceBase ?? P.base, pattern: R.slice(1, -1) }
						}
					;(g = b), (i |= 16)
				}
				if (b.name === "@utility") {
					if (T !== null) throw new Error("`@utility` cannot be nested.")
					if (b.nodes.length === 0)
						throw new Error(
							`\`@utility ${b.params}\` is empty. Utilities should include at least one property.`,
						)
					const _ = Ar(b)
					if (_ === null)
						throw new Error(
							`\`@utility ${b.params}\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter.`,
						)
					u.push(_)
				}
				if (b.name === "@source") {
					if (b.nodes.length > 0)
						throw new Error("`@source` cannot have a body.")
					if (T !== null) throw new Error("`@source` cannot be nested.")
					let _ = !1,
						L = !1,
						R = b.params
					if (
						(R[0] === "n" &&
							R.startsWith("not ") &&
							((_ = !0), (R = R.slice(4))),
						R[0] === "i" &&
							R.startsWith("inline(") &&
							((L = !0), (R = R.slice(7, -1))),
						(R[0] === '"' && R[R.length - 1] !== '"') ||
							(R[0] === "'" && R[R.length - 1] !== "'") ||
							(R[0] !== "'" && R[0] !== '"'))
					)
						throw new Error("`@source` paths must be quoted.")
					const G = R.slice(1, -1)
					if (L) {
						const F = _ ? v : k,
							W = K(G, " ")
						for (const ue of W) for (const xe of ft(ue)) F.push(xe)
					} else h.push({ base: P.base, pattern: G, negated: _ })
					E([])
					return
				}
				if (
					(b.name === "@variant" &&
						(T === null
							? b.nodes.length === 0
								? (b.name = "@custom-variant")
								: (j(b.nodes, (_) => {
										if (_.kind === "at-rule" && _.name === "@slot")
											return (b.name = "@custom-variant"), 2
									}),
									b.name === "@variant" && m.push(b))
							: m.push(b)),
					b.name === "@custom-variant")
				) {
					if (T !== null) throw new Error("`@custom-variant` cannot be nested.")
					E([])
					const [_, L] = K(b.params, " ")
					if (!it.test(_))
						throw new Error(
							`\`@custom-variant ${_}\` defines an invalid variant name. Variants should only contain alphanumeric, dashes or underscore characters.`,
						)
					if (b.nodes.length > 0 && L)
						throw new Error(
							`\`@custom-variant ${_}\` cannot have both a selector and a body.`,
						)
					if (b.nodes.length === 0) {
						if (!L)
							throw new Error(
								`\`@custom-variant ${_}\` has no selector or body.`,
							)
						const R = K(L.slice(1, -1), ",")
						if (R.length === 0 || R.some((W) => W.trim() === ""))
							throw new Error(
								`\`@custom-variant ${_} (${R.join(",")})\` selector is invalid.`,
							)
						const G = [],
							F = []
						for (let W of R)
							(W = W.trim()), W[0] === "@" ? G.push(W) : F.push(W)
						d.push((W) => {
							W.variants.static(
								_,
								(ue) => {
									const xe = []
									F.length > 0 && xe.push(I(F.join(", "), ue.nodes))
									for (const Lt of G) xe.push(M(Lt, ue.nodes))
									ue.nodes = xe
								},
								{ compounds: be([...F, ...G]) },
							)
						})
						return
					} else {
						d.push((R) => {
							R.variants.fromAst(_, b.nodes)
						})
						return
					}
				}
				if (b.name === "@media") {
					const _ = K(b.params, " "),
						L = []
					for (const R of _)
						if (R.startsWith("source(")) {
							const G = R.slice(7, -1)
							j(b.nodes, (F, { replaceWith: W }) => {
								if (
									F.kind === "at-rule" &&
									F.name === "@tailwind" &&
									F.params === "utilities"
								)
									return (
										(F.params += ` source(${G})`),
										W([ne({ sourceBase: P.base }, [F])]),
										2
									)
							})
						} else if (R.startsWith("theme(")) {
							const G = R.slice(6, -1),
								F = G.includes("reference")
							j(b.nodes, (W) => {
								if (W.kind !== "at-rule") {
									if (F)
										throw new Error(
											'Files imported with `@import "\u2026" theme(reference)` must only contain `@theme` blocks.\nUse `@reference "\u2026";` instead.',
										)
									return 0
								}
								if (W.name === "@theme") return (W.params += " " + G), 1
							})
						} else if (R.startsWith("prefix(")) {
							const G = R.slice(7, -1)
							j(b.nodes, (F) => {
								if (F.kind === "at-rule" && F.name === "@theme")
									return (F.params += ` prefix(${G})`), 1
							})
						} else
							R === "important"
								? (s = !0)
								: R === "reference"
									? (b.nodes = [ne({ reference: !0 }, b.nodes)])
									: L.push(R)
					L.length > 0 ? (b.params = L.join(" ")) : _.length > 0 && E(b.nodes)
				}
				if (b.name === "@theme") {
					let [_, L] = rn(b.params)
					if ((P.reference && (_ |= 2), L)) {
						if (!Xi.test(L))
							throw new Error(
								`The prefix "${L}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`,
							)
						a.prefix = L
					}
					return (
						j(b.nodes, (R) => {
							if (R.kind === "at-rule" && R.name === "@keyframes")
								return a.addKeyframes(R), 1
							if (R.kind === "comment") return
							if (R.kind === "declaration" && R.property.startsWith("--")) {
								a.add(he(R.property), R.value ?? "", _)
								return
							}
							const G = re([D(b.name, b.params, [R])])
								.split(`
`)
								.map(
									(F, W, ue) =>
										`${W === 0 || W >= ue.length - 2 ? " " : ">"} ${F}`,
								)
								.join(`
`)
							throw new Error(`\`@theme\` blocks must only contain custom properties or \`@keyframes\`.

${G}`)
						}),
						c ? E([]) : ((c = I(":root, :host", [])), E([c])),
						1
					)
				}
			}
		})
		const y = Rr(a)
		if ((s && (y.important = s), v.length > 0))
			for (const b of v) y.invalidCandidates.add(b)
		i |= await fo({
			designSystem: y,
			base: r,
			ast: t,
			loadModule: o,
			sources: h,
		})
		for (const b of d) b(y)
		for (const b of u) b(y)
		if (c) {
			const b = []
			for (const [E, P] of y.theme.entries())
				P.options & 2 || b.push(l(ce(E), P.value))
			const T = y.theme.getKeyframes()
			for (const E of T) t.push(ne({ theme: !0 }, [U([E])]))
			c.nodes = [ne({ theme: !0 }, b)]
		}
		if (g) {
			const b = g
			;(b.kind = "context"), (b.context = {})
		}
		if (m.length > 0) {
			for (const b of m) {
				const T = I("&", b.nodes),
					E = b.params,
					P = y.parseVariant(E)
				if (P === null)
					throw new Error(`Cannot use \`@variant\` with unknown variant: ${E}`)
				if (Se(T, P, y.variants) === null)
					throw new Error(`Cannot use \`@variant\` with variant: ${E}`)
				Object.assign(b, T)
			}
			i |= 32
		}
		return (
			(i |= $e(t, y)),
			(i |= ze(t, y)),
			j(t, (b, { replaceWith: T }) => {
				if (b.kind === "at-rule") return b.name === "@utility" && T([]), 1
			}),
			{
				designSystem: y,
				ast: t,
				sources: h,
				root: A,
				utilitiesNode: g,
				features: i,
				inlineCandidates: k,
			}
		)
	}
	async function nn(t, r = {}) {
		const {
			designSystem: o,
			ast: e,
			sources: i,
			root: s,
			utilitiesNode: a,
			features: d,
			inlineCandidates: u,
		} = await on(t, r)
		e.unshift(
			qe(`! tailwindcss v${Mt} | MIT License | https://tailwindcss.com `),
		)
		function c(v) {
			o.invalidCandidates.add(v)
		}
		let g = new Set(),
			m = null,
			h = 0,
			k = !1
		for (const v of u) o.invalidCandidates.has(v) || (g.add(v), (k = !0))
		return {
			sources: i,
			root: s,
			features: d,
			build(v) {
				if (d === 0) return t
				if (!a) return (m ??= ke(e, o, r.polyfills)), m
				let A = k,
					y = !1
				k = !1
				const b = g.size
				for (const E of v)
					if (!o.invalidCandidates.has(E))
						if (E[0] === "-" && E[1] === "-") {
							const P = o.theme.markUsedVariable(E)
							;(A ||= P), (y ||= P)
						} else g.add(E), (A ||= g.size !== b)
				if (!A) return (m ??= ke(e, o, r.polyfills)), m
				const T = pe(g, o, { onInvalidCandidate: c }).astNodes
				return !y && h === T.length
					? ((m ??= ke(e, o, r.polyfills)), m)
					: ((h = T.length), (a.nodes = T), (m = ke(e, o, r.polyfills)), m)
			},
		}
	}
	async function mo(t, r = {}) {
		let o = Ae(t),
			e = await nn(o, r),
			i = o,
			s = t
		return {
			...e,
			build(a) {
				const d = e.build(a)
				return d === i || ((s = re(d)), (i = d)), s
			},
		}
	}
	var go = `@layer theme, base, components, utilities;

@import './theme.css' layer(theme);
@import './preflight.css' layer(base);
@import './utilities.css' layer(utilities);
`
	var ho = `/*
  1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
  2. Remove default margins and padding
  3. Reset all borders.
*/

*,
::after,
::before,
::backdrop,
::file-selector-button {
  box-sizing: border-box; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 2 */
  border: 0 solid; /* 3 */
}

/*
  1. Use a consistent sensible line-height in all browsers.
  2. Prevent adjustments of font size after orientation changes in iOS.
  3. Use a more readable tab size.
  4. Use the user's configured \`sans\` font-family by default.
  5. Use the user's configured \`sans\` font-feature-settings by default.
  6. Use the user's configured \`sans\` font-variation-settings by default.
  7. Disable tap highlights on iOS.
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  tab-size: 4; /* 3 */
  font-family: --theme(
    --default-font-family,
    ui-sans-serif,
    system-ui,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji'
  ); /* 4 */
  font-feature-settings: --theme(--default-font-feature-settings, normal); /* 5 */
  font-variation-settings: --theme(--default-font-variation-settings, normal); /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
  1. Add the correct height in Firefox.
  2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
  3. Reset the default border style to a 1px solid border.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
  Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
}

/*
  Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
  Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  -webkit-text-decoration: inherit;
  text-decoration: inherit;
}

/*
  Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
  1. Use the user's configured \`mono\` font-family by default.
  2. Use the user's configured \`mono\` font-feature-settings by default.
  3. Use the user's configured \`mono\` font-variation-settings by default.
  4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: --theme(
    --default-mono-font-family,
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    'Liberation Mono',
    'Courier New',
    monospace
  ); /* 1 */
  font-feature-settings: --theme(--default-mono-font-feature-settings, normal); /* 2 */
  font-variation-settings: --theme(--default-mono-font-variation-settings, normal); /* 3 */
  font-size: 1em; /* 4 */
}

/*
  Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
  Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
  1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
  2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
  3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
  Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
  Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
  Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
  Make lists unstyled by default.
*/

ol,
ul,
menu {
  list-style: none;
}

/*
  1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
  2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
      This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
  Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/*
  1. Inherit font styles in all browsers.
  2. Remove border radius in all browsers.
  3. Remove background color in all browsers.
  4. Ensure consistent opacity for disabled states in all browsers.
*/

button,
input,
select,
optgroup,
textarea,
::file-selector-button {
  font: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  border-radius: 0; /* 2 */
  background-color: transparent; /* 3 */
  opacity: 1; /* 4 */
}

/*
  Restore default font weight.
*/

:where(select:is([multiple], [size])) optgroup {
  font-weight: bolder;
}

/*
  Restore indentation.
*/

:where(select:is([multiple], [size])) optgroup option {
  padding-inline-start: 20px;
}

/*
  Restore space after button.
*/

::file-selector-button {
  margin-inline-end: 4px;
}

/*
  Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
*/

::placeholder {
  opacity: 1;
}

/*
  Set the default placeholder color to a semi-transparent version of the current text color in browsers that do not
  crash when using \`color-mix(\u2026)\` with \`currentcolor\`. (https://github.com/tailwindlabs/tailwindcss/issues/17194)
*/

@supports (not (-webkit-appearance: -apple-pay-button)) /* Not Safari */ or
  (contain-intrinsic-size: 1px) /* Safari 17+ */ {
  ::placeholder {
    color: color-mix(in oklab, currentcolor 50%, transparent);
  }
}

/*
  Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
  Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
  1. Ensure date/time inputs have the same height when empty in iOS Safari.
  2. Ensure text alignment can be changed on date/time inputs in iOS Safari.
*/

::-webkit-date-and-time-value {
  min-height: 1lh; /* 1 */
  text-align: inherit; /* 2 */
}

/*
  Prevent height from changing on date/time inputs in macOS Safari when the input is set to \`display: block\`.
*/

::-webkit-datetime-edit {
  display: inline-flex;
}

/*
  Remove excess padding from pseudo-elements in date/time inputs to ensure consistent height across browsers.
*/

::-webkit-datetime-edit-fields-wrapper {
  padding: 0;
}

::-webkit-datetime-edit,
::-webkit-datetime-edit-year-field,
::-webkit-datetime-edit-month-field,
::-webkit-datetime-edit-day-field,
::-webkit-datetime-edit-hour-field,
::-webkit-datetime-edit-minute-field,
::-webkit-datetime-edit-second-field,
::-webkit-datetime-edit-millisecond-field,
::-webkit-datetime-edit-meridiem-field {
  padding-block: 0;
}

/*
  Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
  Correct the inability to style the border radius in iOS Safari.
*/

button,
input:where([type='button'], [type='reset'], [type='submit']),
::file-selector-button {
  appearance: button;
}

/*
  Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
  Make elements with the HTML hidden attribute stay hidden by default.
*/

[hidden]:where(:not([hidden='until-found'])) {
  display: none !important;
}
`
	var ko = `@theme default {
  --font-sans:
    ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
  --font-mono:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;

  --color-red-50: oklch(97.1% 0.013 17.38);
  --color-red-100: oklch(93.6% 0.032 17.717);
  --color-red-200: oklch(88.5% 0.062 18.334);
  --color-red-300: oklch(80.8% 0.114 19.571);
  --color-red-400: oklch(70.4% 0.191 22.216);
  --color-red-500: oklch(63.7% 0.237 25.331);
  --color-red-600: oklch(57.7% 0.245 27.325);
  --color-red-700: oklch(50.5% 0.213 27.518);
  --color-red-800: oklch(44.4% 0.177 26.899);
  --color-red-900: oklch(39.6% 0.141 25.723);
  --color-red-950: oklch(25.8% 0.092 26.042);

  --color-orange-50: oklch(98% 0.016 73.684);
  --color-orange-100: oklch(95.4% 0.038 75.164);
  --color-orange-200: oklch(90.1% 0.076 70.697);
  --color-orange-300: oklch(83.7% 0.128 66.29);
  --color-orange-400: oklch(75% 0.183 55.934);
  --color-orange-500: oklch(70.5% 0.213 47.604);
  --color-orange-600: oklch(64.6% 0.222 41.116);
  --color-orange-700: oklch(55.3% 0.195 38.402);
  --color-orange-800: oklch(47% 0.157 37.304);
  --color-orange-900: oklch(40.8% 0.123 38.172);
  --color-orange-950: oklch(26.6% 0.079 36.259);

  --color-amber-50: oklch(98.7% 0.022 95.277);
  --color-amber-100: oklch(96.2% 0.059 95.617);
  --color-amber-200: oklch(92.4% 0.12 95.746);
  --color-amber-300: oklch(87.9% 0.169 91.605);
  --color-amber-400: oklch(82.8% 0.189 84.429);
  --color-amber-500: oklch(76.9% 0.188 70.08);
  --color-amber-600: oklch(66.6% 0.179 58.318);
  --color-amber-700: oklch(55.5% 0.163 48.998);
  --color-amber-800: oklch(47.3% 0.137 46.201);
  --color-amber-900: oklch(41.4% 0.112 45.904);
  --color-amber-950: oklch(27.9% 0.077 45.635);

  --color-yellow-50: oklch(98.7% 0.026 102.212);
  --color-yellow-100: oklch(97.3% 0.071 103.193);
  --color-yellow-200: oklch(94.5% 0.129 101.54);
  --color-yellow-300: oklch(90.5% 0.182 98.111);
  --color-yellow-400: oklch(85.2% 0.199 91.936);
  --color-yellow-500: oklch(79.5% 0.184 86.047);
  --color-yellow-600: oklch(68.1% 0.162 75.834);
  --color-yellow-700: oklch(55.4% 0.135 66.442);
  --color-yellow-800: oklch(47.6% 0.114 61.907);
  --color-yellow-900: oklch(42.1% 0.095 57.708);
  --color-yellow-950: oklch(28.6% 0.066 53.813);

  --color-lime-50: oklch(98.6% 0.031 120.757);
  --color-lime-100: oklch(96.7% 0.067 122.328);
  --color-lime-200: oklch(93.8% 0.127 124.321);
  --color-lime-300: oklch(89.7% 0.196 126.665);
  --color-lime-400: oklch(84.1% 0.238 128.85);
  --color-lime-500: oklch(76.8% 0.233 130.85);
  --color-lime-600: oklch(64.8% 0.2 131.684);
  --color-lime-700: oklch(53.2% 0.157 131.589);
  --color-lime-800: oklch(45.3% 0.124 130.933);
  --color-lime-900: oklch(40.5% 0.101 131.063);
  --color-lime-950: oklch(27.4% 0.072 132.109);

  --color-green-50: oklch(98.2% 0.018 155.826);
  --color-green-100: oklch(96.2% 0.044 156.743);
  --color-green-200: oklch(92.5% 0.084 155.995);
  --color-green-300: oklch(87.1% 0.15 154.449);
  --color-green-400: oklch(79.2% 0.209 151.711);
  --color-green-500: oklch(72.3% 0.219 149.579);
  --color-green-600: oklch(62.7% 0.194 149.214);
  --color-green-700: oklch(52.7% 0.154 150.069);
  --color-green-800: oklch(44.8% 0.119 151.328);
  --color-green-900: oklch(39.3% 0.095 152.535);
  --color-green-950: oklch(26.6% 0.065 152.934);

  --color-emerald-50: oklch(97.9% 0.021 166.113);
  --color-emerald-100: oklch(95% 0.052 163.051);
  --color-emerald-200: oklch(90.5% 0.093 164.15);
  --color-emerald-300: oklch(84.5% 0.143 164.978);
  --color-emerald-400: oklch(76.5% 0.177 163.223);
  --color-emerald-500: oklch(69.6% 0.17 162.48);
  --color-emerald-600: oklch(59.6% 0.145 163.225);
  --color-emerald-700: oklch(50.8% 0.118 165.612);
  --color-emerald-800: oklch(43.2% 0.095 166.913);
  --color-emerald-900: oklch(37.8% 0.077 168.94);
  --color-emerald-950: oklch(26.2% 0.051 172.552);

  --color-teal-50: oklch(98.4% 0.014 180.72);
  --color-teal-100: oklch(95.3% 0.051 180.801);
  --color-teal-200: oklch(91% 0.096 180.426);
  --color-teal-300: oklch(85.5% 0.138 181.071);
  --color-teal-400: oklch(77.7% 0.152 181.912);
  --color-teal-500: oklch(70.4% 0.14 182.503);
  --color-teal-600: oklch(60% 0.118 184.704);
  --color-teal-700: oklch(51.1% 0.096 186.391);
  --color-teal-800: oklch(43.7% 0.078 188.216);
  --color-teal-900: oklch(38.6% 0.063 188.416);
  --color-teal-950: oklch(27.7% 0.046 192.524);

  --color-cyan-50: oklch(98.4% 0.019 200.873);
  --color-cyan-100: oklch(95.6% 0.045 203.388);
  --color-cyan-200: oklch(91.7% 0.08 205.041);
  --color-cyan-300: oklch(86.5% 0.127 207.078);
  --color-cyan-400: oklch(78.9% 0.154 211.53);
  --color-cyan-500: oklch(71.5% 0.143 215.221);
  --color-cyan-600: oklch(60.9% 0.126 221.723);
  --color-cyan-700: oklch(52% 0.105 223.128);
  --color-cyan-800: oklch(45% 0.085 224.283);
  --color-cyan-900: oklch(39.8% 0.07 227.392);
  --color-cyan-950: oklch(30.2% 0.056 229.695);

  --color-sky-50: oklch(97.7% 0.013 236.62);
  --color-sky-100: oklch(95.1% 0.026 236.824);
  --color-sky-200: oklch(90.1% 0.058 230.902);
  --color-sky-300: oklch(82.8% 0.111 230.318);
  --color-sky-400: oklch(74.6% 0.16 232.661);
  --color-sky-500: oklch(68.5% 0.169 237.323);
  --color-sky-600: oklch(58.8% 0.158 241.966);
  --color-sky-700: oklch(50% 0.134 242.749);
  --color-sky-800: oklch(44.3% 0.11 240.79);
  --color-sky-900: oklch(39.1% 0.09 240.876);
  --color-sky-950: oklch(29.3% 0.066 243.157);

  --color-blue-50: oklch(97% 0.014 254.604);
  --color-blue-100: oklch(93.2% 0.032 255.585);
  --color-blue-200: oklch(88.2% 0.059 254.128);
  --color-blue-300: oklch(80.9% 0.105 251.813);
  --color-blue-400: oklch(70.7% 0.165 254.624);
  --color-blue-500: oklch(62.3% 0.214 259.815);
  --color-blue-600: oklch(54.6% 0.245 262.881);
  --color-blue-700: oklch(48.8% 0.243 264.376);
  --color-blue-800: oklch(42.4% 0.199 265.638);
  --color-blue-900: oklch(37.9% 0.146 265.522);
  --color-blue-950: oklch(28.2% 0.091 267.935);

  --color-indigo-50: oklch(96.2% 0.018 272.314);
  --color-indigo-100: oklch(93% 0.034 272.788);
  --color-indigo-200: oklch(87% 0.065 274.039);
  --color-indigo-300: oklch(78.5% 0.115 274.713);
  --color-indigo-400: oklch(67.3% 0.182 276.935);
  --color-indigo-500: oklch(58.5% 0.233 277.117);
  --color-indigo-600: oklch(51.1% 0.262 276.966);
  --color-indigo-700: oklch(45.7% 0.24 277.023);
  --color-indigo-800: oklch(39.8% 0.195 277.366);
  --color-indigo-900: oklch(35.9% 0.144 278.697);
  --color-indigo-950: oklch(25.7% 0.09 281.288);

  --color-violet-50: oklch(96.9% 0.016 293.756);
  --color-violet-100: oklch(94.3% 0.029 294.588);
  --color-violet-200: oklch(89.4% 0.057 293.283);
  --color-violet-300: oklch(81.1% 0.111 293.571);
  --color-violet-400: oklch(70.2% 0.183 293.541);
  --color-violet-500: oklch(60.6% 0.25 292.717);
  --color-violet-600: oklch(54.1% 0.281 293.009);
  --color-violet-700: oklch(49.1% 0.27 292.581);
  --color-violet-800: oklch(43.2% 0.232 292.759);
  --color-violet-900: oklch(38% 0.189 293.745);
  --color-violet-950: oklch(28.3% 0.141 291.089);

  --color-purple-50: oklch(97.7% 0.014 308.299);
  --color-purple-100: oklch(94.6% 0.033 307.174);
  --color-purple-200: oklch(90.2% 0.063 306.703);
  --color-purple-300: oklch(82.7% 0.119 306.383);
  --color-purple-400: oklch(71.4% 0.203 305.504);
  --color-purple-500: oklch(62.7% 0.265 303.9);
  --color-purple-600: oklch(55.8% 0.288 302.321);
  --color-purple-700: oklch(49.6% 0.265 301.924);
  --color-purple-800: oklch(43.8% 0.218 303.724);
  --color-purple-900: oklch(38.1% 0.176 304.987);
  --color-purple-950: oklch(29.1% 0.149 302.717);

  --color-fuchsia-50: oklch(97.7% 0.017 320.058);
  --color-fuchsia-100: oklch(95.2% 0.037 318.852);
  --color-fuchsia-200: oklch(90.3% 0.076 319.62);
  --color-fuchsia-300: oklch(83.3% 0.145 321.434);
  --color-fuchsia-400: oklch(74% 0.238 322.16);
  --color-fuchsia-500: oklch(66.7% 0.295 322.15);
  --color-fuchsia-600: oklch(59.1% 0.293 322.896);
  --color-fuchsia-700: oklch(51.8% 0.253 323.949);
  --color-fuchsia-800: oklch(45.2% 0.211 324.591);
  --color-fuchsia-900: oklch(40.1% 0.17 325.612);
  --color-fuchsia-950: oklch(29.3% 0.136 325.661);

  --color-pink-50: oklch(97.1% 0.014 343.198);
  --color-pink-100: oklch(94.8% 0.028 342.258);
  --color-pink-200: oklch(89.9% 0.061 343.231);
  --color-pink-300: oklch(82.3% 0.12 346.018);
  --color-pink-400: oklch(71.8% 0.202 349.761);
  --color-pink-500: oklch(65.6% 0.241 354.308);
  --color-pink-600: oklch(59.2% 0.249 0.584);
  --color-pink-700: oklch(52.5% 0.223 3.958);
  --color-pink-800: oklch(45.9% 0.187 3.815);
  --color-pink-900: oklch(40.8% 0.153 2.432);
  --color-pink-950: oklch(28.4% 0.109 3.907);

  --color-rose-50: oklch(96.9% 0.015 12.422);
  --color-rose-100: oklch(94.1% 0.03 12.58);
  --color-rose-200: oklch(89.2% 0.058 10.001);
  --color-rose-300: oklch(81% 0.117 11.638);
  --color-rose-400: oklch(71.2% 0.194 13.428);
  --color-rose-500: oklch(64.5% 0.246 16.439);
  --color-rose-600: oklch(58.6% 0.253 17.585);
  --color-rose-700: oklch(51.4% 0.222 16.935);
  --color-rose-800: oklch(45.5% 0.188 13.697);
  --color-rose-900: oklch(41% 0.159 10.272);
  --color-rose-950: oklch(27.1% 0.105 12.094);

  --color-slate-50: oklch(98.4% 0.003 247.858);
  --color-slate-100: oklch(96.8% 0.007 247.896);
  --color-slate-200: oklch(92.9% 0.013 255.508);
  --color-slate-300: oklch(86.9% 0.022 252.894);
  --color-slate-400: oklch(70.4% 0.04 256.788);
  --color-slate-500: oklch(55.4% 0.046 257.417);
  --color-slate-600: oklch(44.6% 0.043 257.281);
  --color-slate-700: oklch(37.2% 0.044 257.287);
  --color-slate-800: oklch(27.9% 0.041 260.031);
  --color-slate-900: oklch(20.8% 0.042 265.755);
  --color-slate-950: oklch(12.9% 0.042 264.695);

  --color-gray-50: oklch(98.5% 0.002 247.839);
  --color-gray-100: oklch(96.7% 0.003 264.542);
  --color-gray-200: oklch(92.8% 0.006 264.531);
  --color-gray-300: oklch(87.2% 0.01 258.338);
  --color-gray-400: oklch(70.7% 0.022 261.325);
  --color-gray-500: oklch(55.1% 0.027 264.364);
  --color-gray-600: oklch(44.6% 0.03 256.802);
  --color-gray-700: oklch(37.3% 0.034 259.733);
  --color-gray-800: oklch(27.8% 0.033 256.848);
  --color-gray-900: oklch(21% 0.034 264.665);
  --color-gray-950: oklch(13% 0.028 261.692);

  --color-zinc-50: oklch(98.5% 0 0);
  --color-zinc-100: oklch(96.7% 0.001 286.375);
  --color-zinc-200: oklch(92% 0.004 286.32);
  --color-zinc-300: oklch(87.1% 0.006 286.286);
  --color-zinc-400: oklch(70.5% 0.015 286.067);
  --color-zinc-500: oklch(55.2% 0.016 285.938);
  --color-zinc-600: oklch(44.2% 0.017 285.786);
  --color-zinc-700: oklch(37% 0.013 285.805);
  --color-zinc-800: oklch(27.4% 0.006 286.033);
  --color-zinc-900: oklch(21% 0.006 285.885);
  --color-zinc-950: oklch(14.1% 0.005 285.823);

  --color-neutral-50: oklch(98.5% 0 0);
  --color-neutral-100: oklch(97% 0 0);
  --color-neutral-200: oklch(92.2% 0 0);
  --color-neutral-300: oklch(87% 0 0);
  --color-neutral-400: oklch(70.8% 0 0);
  --color-neutral-500: oklch(55.6% 0 0);
  --color-neutral-600: oklch(43.9% 0 0);
  --color-neutral-700: oklch(37.1% 0 0);
  --color-neutral-800: oklch(26.9% 0 0);
  --color-neutral-900: oklch(20.5% 0 0);
  --color-neutral-950: oklch(14.5% 0 0);

  --color-stone-50: oklch(98.5% 0.001 106.423);
  --color-stone-100: oklch(97% 0.001 106.424);
  --color-stone-200: oklch(92.3% 0.003 48.717);
  --color-stone-300: oklch(86.9% 0.005 56.366);
  --color-stone-400: oklch(70.9% 0.01 56.259);
  --color-stone-500: oklch(55.3% 0.013 58.071);
  --color-stone-600: oklch(44.4% 0.011 73.639);
  --color-stone-700: oklch(37.4% 0.01 67.558);
  --color-stone-800: oklch(26.8% 0.007 34.298);
  --color-stone-900: oklch(21.6% 0.006 56.043);
  --color-stone-950: oklch(14.7% 0.004 49.25);

  --color-black: #000;
  --color-white: #fff;

  --spacing: 0.25rem;

  --breakpoint-sm: 40rem;
  --breakpoint-md: 48rem;
  --breakpoint-lg: 64rem;
  --breakpoint-xl: 80rem;
  --breakpoint-2xl: 96rem;

  --container-3xs: 16rem;
  --container-2xs: 18rem;
  --container-xs: 20rem;
  --container-sm: 24rem;
  --container-md: 28rem;
  --container-lg: 32rem;
  --container-xl: 36rem;
  --container-2xl: 42rem;
  --container-3xl: 48rem;
  --container-4xl: 56rem;
  --container-5xl: 64rem;
  --container-6xl: 72rem;
  --container-7xl: 80rem;

  --text-xs: 0.75rem;
  --text-xs--line-height: calc(1 / 0.75);
  --text-sm: 0.875rem;
  --text-sm--line-height: calc(1.25 / 0.875);
  --text-base: 1rem;
  --text-base--line-height: calc(1.5 / 1);
  --text-lg: 1.125rem;
  --text-lg--line-height: calc(1.75 / 1.125);
  --text-xl: 1.25rem;
  --text-xl--line-height: calc(1.75 / 1.25);
  --text-2xl: 1.5rem;
  --text-2xl--line-height: calc(2 / 1.5);
  --text-3xl: 1.875rem;
  --text-3xl--line-height: calc(2.25 / 1.875);
  --text-4xl: 2.25rem;
  --text-4xl--line-height: calc(2.5 / 2.25);
  --text-5xl: 3rem;
  --text-5xl--line-height: 1;
  --text-6xl: 3.75rem;
  --text-6xl--line-height: 1;
  --text-7xl: 4.5rem;
  --text-7xl--line-height: 1;
  --text-8xl: 6rem;
  --text-8xl--line-height: 1;
  --text-9xl: 8rem;
  --text-9xl--line-height: 1;

  --font-weight-thin: 100;
  --font-weight-extralight: 200;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;

  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;

  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  --radius-xs: 0.125rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-4xl: 2rem;

  --shadow-2xs: 0 1px rgb(0 0 0 / 0.05);
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  --inset-shadow-2xs: inset 0 1px rgb(0 0 0 / 0.05);
  --inset-shadow-xs: inset 0 1px 1px rgb(0 0 0 / 0.05);
  --inset-shadow-sm: inset 0 2px 4px rgb(0 0 0 / 0.05);

  --drop-shadow-xs: 0 1px 1px rgb(0 0 0 / 0.05);
  --drop-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.15);
  --drop-shadow-md: 0 3px 3px rgb(0 0 0 / 0.12);
  --drop-shadow-lg: 0 4px 4px rgb(0 0 0 / 0.15);
  --drop-shadow-xl: 0 9px 7px rgb(0 0 0 / 0.1);
  --drop-shadow-2xl: 0 25px 25px rgb(0 0 0 / 0.15);

  --text-shadow-2xs: 0px 1px 0px rgb(0 0 0 / 0.15);
  --text-shadow-xs: 0px 1px 1px rgb(0 0 0 / 0.2);
  --text-shadow-sm:
    0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075);
  --text-shadow-md:
    0px 1px 1px rgb(0 0 0 / 0.1), 0px 1px 2px rgb(0 0 0 / 0.1), 0px 2px 4px rgb(0 0 0 / 0.1);
  --text-shadow-lg:
    0px 1px 2px rgb(0 0 0 / 0.1), 0px 3px 2px rgb(0 0 0 / 0.1), 0px 4px 8px rgb(0 0 0 / 0.1);

  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  --animate-spin: spin 1s linear infinite;
  --animate-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-bounce: bounce 1s infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes ping {
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }

    50% {
      transform: none;
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }

  --blur-xs: 4px;
  --blur-sm: 8px;
  --blur-md: 12px;
  --blur-lg: 16px;
  --blur-xl: 24px;
  --blur-2xl: 40px;
  --blur-3xl: 64px;

  --perspective-dramatic: 100px;
  --perspective-near: 300px;
  --perspective-normal: 500px;
  --perspective-midrange: 800px;
  --perspective-distant: 1200px;

  --aspect-video: 16 / 9;

  --default-transition-duration: 150ms;
  --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  --default-font-family: --theme(--font-sans, initial);
  --default-font-feature-settings: --theme(--font-sans--font-feature-settings, initial);
  --default-font-variation-settings: --theme(--font-sans--font-variation-settings, initial);
  --default-mono-font-family: --theme(--font-mono, initial);
  --default-mono-font-feature-settings: --theme(--font-mono--font-feature-settings, initial);
  --default-mono-font-variation-settings: --theme(--font-mono--font-variation-settings, initial);
}

/* Deprecated */
@theme default inline reference {
  --blur: 8px;
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --drop-shadow: 0 1px 2px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.06);
  --radius: 0.25rem;
  --max-width-prose: 65ch;
}
`
	var vo = `@tailwind utilities;
`
	var Fe = { index: go, preflight: ho, theme: ko, utilities: vo }
	var dt = class {
		start(r) {
			performance.mark(`${r} (start)`)
		}
		end(r, o) {
			performance.mark(`${r} (end)`),
				performance.measure(r, {
					start: `${r} (start)`,
					end: `${r} (end)`,
					detail: o,
				})
		}
		hit(r, o) {
			performance.mark(r, { detail: o })
		}
		error(r) {
			throw (performance.mark("(error)", { detail: { error: `${r}` } }), r)
		}
	}

	var bo = "text/tailwindcss",
		pt,
		It = new Set(),
		jt = "",
		Ft = document.createElement("style"),
		wo = Promise.resolve(),
		dn = 1,
		X = new dt()
	async function pn() {
		X.start("Create compiler"), X.start("Reading Stylesheets")
		let t = document.querySelectorAll(`style[type="${bo}"]`),
			r = ""
		for (const o of t)
			yo(o),
				(r +=
					o.textContent +
					`
`)
		if (
			(r.includes("@import") || (r = `@import "tailwindcss";${r}`),
			X.end("Reading Stylesheets", { size: r.length, changed: jt !== r }),
			jt !== r)
		) {
			;(jt = r), X.start("Compile CSS")
			try {
				pt = await mo(r, { base: "/", loadStylesheet: mn, loadModule: gn })
			} finally {
				X.end("Compile CSS"), X.end("Create compiler")
			}
			It.clear()
		}
	}
	async function mn(t, r) {
		function o() {
			if (t === "tailwindcss") return { base: r, content: Fe.index }
			if (
				t === "tailwindcss/preflight" ||
				t === "tailwindcss/preflight.css" ||
				t === "./preflight.css"
			)
				return { base: r, content: Fe.preflight }
			if (
				t === "tailwindcss/theme" ||
				t === "tailwindcss/theme.css" ||
				t === "./theme.css"
			)
				return { base: r, content: Fe.theme }
			if (
				t === "tailwindcss/utilities" ||
				t === "tailwindcss/utilities.css" ||
				t === "./utilities.css"
			)
				return { base: r, content: Fe.utilities }
			throw new Error(`The browser build does not support @import for "${t}"`)
		}
		try {
			const e = o()
			return (
				X.hit("Loaded stylesheet", { id: t, base: r, size: e.content.length }),
				e
			)
		} catch (e) {
			throw (
				(X.hit("Failed to load stylesheet", {
					id: t,
					base: r,
					error: e.message ?? e,
				}),
				e)
			)
		}
	}
	async function gn() {
		throw new Error(
			"The browser build does not support plugins or config files.",
		)
	}
	async function hn(t) {
		if (!pt) return
		const r = new Set()
		X.start("Collect classes")
		for (const o of document.querySelectorAll("[class]"))
			for (const e of o.classList) It.has(e) || (It.add(e), r.add(e))
		X.end("Collect classes", { count: r.size }),
			!(r.size === 0 && t === "incremental") &&
				(X.start("Build utilities"),
				(Ft.textContent = pt.build(Array.from(r))),
				X.end("Build utilities"))
	}
	function mt(t) {
		async function r() {
			if (!pt && t !== "full") return
			const o = dn++
			X.start(`Build #${o} (${t})`),
				t === "full" && (await pn()),
				X.start("Build"),
				await hn(t),
				X.end("Build"),
				X.end(`Build #${o} (${t})`)
		}
		wo = wo.then(r).catch((o) => X.error(o))
	}
	var kn = new MutationObserver(() => mt("full"))
	function yo(t) {
		kn.observe(t, {
			attributes: !0,
			attributeFilter: ["type"],
			characterData: !0,
			subtree: !0,
			childList: !0,
		})
	}
	new MutationObserver((t) => {
		let r = 0,
			o = 0
		for (const e of t) {
			for (const i of e.addedNodes)
				i.nodeType === Node.ELEMENT_NODE &&
					i.tagName === "STYLE" &&
					i.getAttribute("type") === bo &&
					(yo(i), r++)
			for (const i of e.addedNodes) i.nodeType === 1 && i !== Ft && o++
			e.type === "attributes" && o++
		}
		if (r > 0) return mt("full")
		if (o > 0) return mt("incremental")
	}).observe(document.documentElement, {
		attributes: !0,
		attributeFilter: ["class"],
		childList: !0,
		subtree: !0,
	})
	mt("full")
	document.head.append(Ft)
})()
